const jwt = require("jsonwebtoken");
const querystring = require('querystring');
const { JWTSecret } = require("../config/consts");

function checkToken(req, res, next) {
    const urlParams = querystring.parse(req.url.split('?')[1]);

    let token = req.headers['x-access-token'] || req.headers['authorization'] || urlParams.token;

    if (token && token.startsWith('Bearer ')) {
        // Remove Bearer from string
        token = token.slice(7, token.length);
    }

    if (token) {
        jwt.verify(token, JWTSecret, function (err, decoded) {
            if (err) {
                res
                    .json({
                        success: false,
                        message: 'Failed to authenticate token.'
                    });
            } else {
                req.decoded = decoded;
                next();
            }
        });
    } else {
        res
            .status(403)
            .send({
                success: false,
                message: 'Access denied. No token provided.'
            });
    }
}

module.exports = checkToken;
