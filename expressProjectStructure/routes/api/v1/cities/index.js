const express = require('express');
const router = express.Router();
// const dataProvider = require('../../../../helpers/data-provider/index.js');
// const checkToken = require('./../../../../middlewares/checkJWTToken');
const { respond } = require("../../helpers");
const { dbName } = require("../../../../config/db");

const db = require('./../../../../database/db');

router.route('/')
    .get(/*checkToken, */function (req, res) {
        db
            .get()
            .db(dbName)
            .collection("cities")
            .aggregate([{ $sample: { size: 1 } }])
            .toArray()
            .then(cities => {
                respond(cities, res);
            })
    })
    .post(/*checkToken, */function (req, res) {
        console.log('-- req.body: ', req.body);
        // respond(dataProvider.addProduct(req.body), res);
    });

router.get('/:id',/* checkToken, */function (req, res) {
    // respond(dataProvider.readProductById(req.params.id), res);
});

router.get('/:id/reviews',/* checkToken, */function (req, res) {
    // respond(dataProvider.findProductReviews(req.params.id), res);
});

module.exports = router;
