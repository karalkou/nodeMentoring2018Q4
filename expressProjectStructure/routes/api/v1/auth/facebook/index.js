const express = require('express');
const router = express.Router();
const passportConfigured = require('./../../../../../helpers/passportLocal.js');

router.get('/facebook',
    passportConfigured.authenticate('facebook', {
        session: false,
    }));

router.get("/facebook/callback",
    passportConfigured.authenticate('facebook', {
        session: false,
    }),
    (req, res, next) => {
        /*res
            .status(200)
            .json({
                code: 200,
                message: 'OK'
            })*/
        console.log('-- req.body: ', req.body);
        res.redirect('/api1/products');

    });

module.exports = router;
