const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const passportConfigured = require('./../../../../../helpers/passportLocal.js');
const { JWTSecret } = require("./../../../../../config/consts");

router.post('/local',
    passportConfigured.authenticate('local', { session: false }),
    (req, res, next) => {
        const { user } = req;
        const payload = {
            sub: user.id,
            userName: user.userName
        };
        const token = jwt.sign(payload, JWTSecret, { expiresIn: 10000, });

        res
            .status(200)
            .json({
                code: 200,
                message: 'OK',
                data: {
                    user: {
                        email: req.user.email,
                        username: req.user.userName
                    }
                },
                token
            });
    });

module.exports = router;
