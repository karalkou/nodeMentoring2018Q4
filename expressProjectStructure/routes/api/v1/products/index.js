const express = require('express');
const router = express.Router();
const dataProvider = require('./../../../../controllers/data-provider/index.js');
const checkToken = require('./../../../../middlewares/checkJWTToken');
const { respond } = require("../../helpers");

router.route('/')
    .get(checkToken, function (req, res) {
        respond(dataProvider.readProducts(), res);
    })
    .post(checkToken, function (req, res) {
        console.log('-- req.body: ', req.body);
        respond(dataProvider.addProduct(req.body), res);
    });

router.get('/:id', checkToken, function (req, res) {
    respond(dataProvider.readProductById(req.params.id), res);
});

router.get('/:id/reviews', checkToken, function (req, res) {
    respond(dataProvider.findProductReviews(req.params.id), res);
});

module.exports = router;
