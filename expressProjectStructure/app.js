const express = require('express');
const path = require('path');
const { readFile } = require('fs');
const { promisify } = require('util');
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');
const sequelizeConfig = require('./config/sequelize');
const DBInit = require("./helpers/database_sql");

const readFileAsync = promisify(readFile);

const app = express();
const router = express.Router();

const sequelize = new Sequelize(...sequelizeConfig);

sequelize
    .authenticate()
    .then(() => DBInit(sequelize))
    .catch(err => console.log(err));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/', router);

// -------------- Authentication ----------------
// ----------------------------------------------

//-- JWT authentication
const jwtChecklRouter = require('./routes/api/v1/auth/jwt');
app.use('/api/v1/auth/', jwtChecklRouter);

//-- passportJS authentication: Local Strategy
const passportLocalRouter = require('./routes/api/v1/auth/local');
app.use('/api/v1/auth/', passportLocalRouter);

//--- passportJS authentication: Facebook Strategy
const passportFacebookRouter = require('./routes/api/v1/auth/facebook');
app.use('/api/v1/auth/', passportFacebookRouter);

//--- passportJS authentication: Google OAuth2 Strategy
const passportGoogleRouter = require('./routes/api/v1/auth/google');
app.use('/api/v1/auth/', passportGoogleRouter);


// -------------- Usual api routes ----------------
// ------------------------------------------------

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

const productsRouter = require('./routes/api/v1/products');
app.use('/api/v1/products', productsRouter);

const usersRouter = require('./routes/api/v1/users');
app.use('/api/v1/users', usersRouter);

module.exports = app;
