const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { JWTSecret } = require("./../../../../../config/consts");
const passportConfigured = require('./../../../../../helpers/passportConfigured.js');

router.get('/google',
    passportConfigured.authenticate(
        'google',
        {
            session: false,
            scope: ['email'],
        }
    )
);

router.get('/google/callback',
    passportConfigured.authenticate('google', { session: false, }),
    (req, res, next) => {
        const { user } = req;

        const payload = {
            sub: user.id,
            userName: user.userName
        };
        const token = jwt.sign(payload, JWTSecret, { expiresIn: 10000, });

        res.redirect(`/api/v1/products?token=${token}`);
    }
);

module.exports = router;
