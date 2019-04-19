const express = require('express');
const router = express.Router();
const ProductModel = require('./../../../../database/models/product');
const { createNotFindByIdError, createDBError } = require("./../../../../helpers/errorCreators");
const checkToken = require('./../../../../middlewares/checkJWTToken');

router.route('/')
    .get(/* checkToken, */ function (req, res) {
        ProductModel.find({})
            .then(products => res.json(products))
            .catch(() => next(createDBError()));
    })
    .post(/* checkToken, */ function (req, res) {
        const { body: reqBody } = req;
        const newProduct = {
            ...reqBody,
            reviews: reqBody.reviews || 0,
        };

        new ProductModel(newProduct)
            .save()
            .then(product => res.json(product))
            .catch(() => next(createDBError()));
    });

router.get('/:id', /* checkToken, */ function (req, res) {
    ProductModel.findById(req.params.id)
        .then(product => {
            if (product) {
                res.json(product);
            } else {
                next(createNotFindByIdError('product', req.params.id));
            }
        })
        .catch(() => next(createDBError()));
});

router.delete('/:id', /* checkToken, */ (req, res, next) => {
    ProductModel.findByIdAndDelete(req.params.id)
        .then(product => {
            if (product) {
                res.json(product);
            } else {
                next(createNotFindByIdError('product', req.params.id));
            }
        })
        .catch(() => next(createDBError()));
});

router.get('/:id/reviews', /* checkToken, */ function (req, res) {
    ProductModel.findById(req.params.id)
        .then(product => {
            if (product) {
                res.json({ reviews: product.reviews });
            } else {
                next(createNotFindByIdError('product', req.params.id));
            }
        })
        .catch(() => next(createDBError()));
});

module.exports = router;
