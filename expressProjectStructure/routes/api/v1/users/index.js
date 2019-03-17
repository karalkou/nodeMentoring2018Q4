const express = require('express');
const router = express.Router();
const checkToken = require('./../../../../middlewares/checkJWTToken');
const models = require('./../../../../database_sql/models');

const { User } = models;

router.get('/', checkToken, function (req, res) {
    User.findAll({})
        .then(users => res.json(users))
        .catch(() => res
            .status(400)
            .json({
                status: 400,
                message: 'Something went wrong, try again',
            }));
});

module.exports = router;
