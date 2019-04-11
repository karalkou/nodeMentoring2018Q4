const express = require('express');
const router = express.Router();
const CityModel = require('./../../../../database/models/city');
const { createNotFindByIdError, createDBError } = require("./../../../../helpers/errorCreators");
const checkToken = require('./../../../../middlewares/checkJWTToken');

router.get('/', checkToken, (req, res, next) => {
    CityModel.find({})
        .then(cities => res.json(cities))
        .catch(() => next(createDBError()));
});

router.post('/', checkToken, (req, res, next) => {
    new CityModel(req.body)
        .save()
        .then(city => res.json(city))
        .catch(() => next(createDBError()));
});

router.delete('/:id', checkToken, (req, res, next) => {
    CityModel.findByIdAndDelete(req.params.id)
        .then(city => {
            if (city) {
                res.json(city);
            } else {
                next(createNotFindByIdError('city', req.params.id));
            }
        })
        .catch(() => next(createDBError()));
});

router.put('/:id', checkToken, (req, res, next) => {
    const { params, body } = req;

    CityModel.findByIdAndUpdate(params.id, body, { new: true, upsert: true })
        .then(city => {
            if (city) {
                res.json(city);
            } else {
                next(createNotFindByIdError('city', req.params.id));
            }
        })
        .catch(() => next(createDBError()));
});

module.exports = router;
