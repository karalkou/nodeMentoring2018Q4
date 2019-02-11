const express = require('express');

const app = express();
const router = express.Router();

router.get('/', function (req, res) {
    res.send('Hello World')
});

router.route('/api/products')
    .get(function (req, res) {
        res.send('Return ​ ALL ​products')
    })
    .post(function (req, res) {
        res.send('Add ​ NEW​ product and return it')
    });

router.get('/api/:id', function (req, res) {
    res.send('Return ​ SINGLE​ product')
});

router.get('/api/:id/reviews', function (req, res) {
    res.send('Return ​ ALL ​reviews for a single product')
});

router.get('/api/users', function (req, res) {
    res.send('Return ​ ALL​ users')
});

app.use('/', router);

module.exports = app;
