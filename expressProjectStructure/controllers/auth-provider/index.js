const jwt = require('jsonwebtoken');
const { JWTSecret } = require("../../config/consts");
const users = require('./../../mocks/users');

module.exports.login = (req, res) => {
    const { body: { userName, password } } = req;

    if (!userName || !password) {
        res
            .status(400)
            .json({
                code: 400,
                message: 'You haven\'t provided request with username or password'
            });
    }

    const user = users.find(user => user.userName === userName && user.password === password);

    if (!user) {
        res
            .status(404)
            .json({
                code: 404,
                message: 'Not found'
            })
    }

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
                    email: user.email,
                    userName: user.userName
                }
            },
            token
        });

};
