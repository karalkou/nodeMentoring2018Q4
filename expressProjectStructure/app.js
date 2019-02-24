const express = require('express');
const path = require('path');
const { readFile } = require('fs');
const { promisify } = require('util');
const bodyParser = require('body-parser');
const dataProvider = require('./controllers/data-provider/index.js');
const authProvider = require('./controllers/auth-provider/index.js');

const readFileAsync = promisify(readFile);

const app = express();
const router = express.Router();

app.use(bodyParser.json());

app.use('/', router);

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

router.route('/api/products')
    .get(function (req, res) {
        respond(dataProvider.readProducts(), res);
    })
    .post(function (req, res) {
        console.log('-- req.body: ', req.body);
        respond(dataProvider.addProduct(req.body), res);
    });

router.get('/api/products/:id', function (req, res) {
    respond(dataProvider.readProductById(req.params.id), res);
});

router.get('/api/products/:id/reviews', function (req, res) {
    respond(dataProvider.findProductReviews(req.params.id), res);
});

router.get('/api/users', function (req, res) {
    respond(dataProvider.readUsers(), res);
});

router.post('/auth', authProvider.login);

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
