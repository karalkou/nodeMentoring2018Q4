const express = require('express');
const path = require('path');
const { readFile } = require('fs');
const { promisify } = require('util');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const dataProvider = require('./controllers/data-provider/index.js');
// const authProvider = require('./controllers/auth-provider/index.js');
const passportConfigured = require('./helpers/passportLocal');
const checkToken = require('./middlewares/checkJWTToken');
const { JWTSecret } = require("./config/consts");

const readFileAsync = promisify(readFile);

const app = express();
const router = express.Router();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/', router);

//-- JWT authentication
// router.post('/auth', authProvider.login);

//-- passportJS authentication
//--- Local Strategy
router.post('/auth',
    passportConfigured.authenticate('local', { session: false }),
    (req, res, next) => {
        const { user } = req;
        const payload = {
            sub: user.id,
            userName: user.userName
        };
        const token = jwt.sign(payload, JWTSecret, { expiresIn: 10000, });

        res
            .status(200)
            .json({
                code: 200,
                message: 'OK',
                data: {
                    user: {
                        email: req.user.email,
                        username: req.user.userName
                    }
                },
                token
            });
    });

//--- Facebook Strategy
router.get('/auth/facebook',
    passportConfigured.authenticate('facebook', {
        session: false,
    }));

router.get("/auth/facebook/callback",
    passportConfigured.authenticate('facebook', {
        session: false,
    }),
    (req, res, next) => {
        /*res
            .status(200)
            .json({
                code: 200,
                message: 'OK'
            })*/
        res.redirect('/api1/products');

    });

//-- Usual api routes
router.get('/', function (req, res) {
    readFileAsync(path.resolve(__dirname, './index.html'))
        .then(data => {
            if (data) {
                res.writeHead(200, { 'Content-Type': 'text/html; charset=utf8' });
                res.end(data);
            } else {
                res.writeHead(404);
                res.end('404 not found');
            }
        })
        .catch(err => console.error(err));
});

router.route('/api1/products')
    .get(function (req, res) {
        respond(dataProvider.readProducts(), res);
    });

router.route('/api/products')
    .get(checkToken, function (req, res) {
        respond(dataProvider.readProducts(), res);
    })
    .post(checkToken, function (req, res) {
        console.log('-- req.body: ', req.body);
        respond(dataProvider.addProduct(req.body), res);
    });

router.get('/api/products/:id', checkToken, function (req, res) {
    respond(dataProvider.readProductById(req.params.id), res);
});

router.get('/api/products/:id/reviews', checkToken, function (req, res) {
    respond(dataProvider.findProductReviews(req.params.id), res);
});

router.get('/api/users', checkToken, function (req, res) {
    respond(dataProvider.readUsers(), res);
});

module.exports = app;

function respond(data, res) {
    if (data === 400) {
        res.writeHead(400);
        res.end('400 Bad request');
    } else if (!data) {
        res.writeHead(404);
        res.end('404 Not found');
    } else {
        res.writeHead(200, { 'Content-Type': 'application/json; charset=utf8' });
        res.end(JSON.stringify(data));
    }
}
