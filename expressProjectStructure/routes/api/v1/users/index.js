const express = require('express');
const router = express.Router();
const dataProvider = require('./../../../../controllers/data-provider/index.js');
const checkToken = require('./../../../../middlewares/checkJWTToken');
const { respond } = require("../../helpers");

router.get('/', checkToken, function (req, res) {
    respond(dataProvider.readUsers(), res);
});

module.exports = router;
