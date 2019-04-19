const express = require('express');
const router = express.Router();
const authProvider = require('../../../../../helpers/auth-provider/index.js');

router.post('/jwt', authProvider.login);

module.exports = router;
