const express = require('express');
const router = express.Router();
const UserModel = require('./../../../../database/models/user');
const { createNotFindByIdError, createDBError } = require("./../../../../helpers/errorCreators");
const checkToken = require('./../../../../middlewares/checkJWTToken');

router.get('/', checkToken, (req, res) => {
    UserModel.find({})
        .then(users => res.json(users))
        .catch(() => next(createDBError()));
});

router.post('/', checkToken, (req, res) => {
    const { body: reqBody } = req;
    const newUser = {
        ...reqBody,
    };

    new UserModel(newUser)
        .save()
        .then(user => res.json(user))
        .catch(() => next(createDBError()));
});

router.delete('/:id', checkToken, (req, res, next) => {
    UserModel.findByIdAndDelete(req.params.id)
        .then(user => {
            if (user) {
                res.json(user);
            } else {
                next(createNotFindByIdError('user', req.params.id));
            }
        })
        .catch(() => next(createDBError()));
});


module.exports = router;
