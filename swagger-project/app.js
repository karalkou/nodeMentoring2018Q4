'use strict';

var SwaggerExpress = require('swagger-express-mw');
var app = require('express')();

const connectToDB = require('./database/database');

module.exports = app; // for testing

var config = {
    appRoot: __dirname // required config
};

SwaggerExpress.create(config, function (err, swaggerExpress) {
    if (err) {
        throw err;
    }

    // install middleware
    swaggerExpress.register(app);

    var port = process.env.PORT || 10010;
    connectToDB
        .then(() => app.listen(port, () => {
            console.log(`Express server for swagger listening on port ${port}`);
        }));

    // console.log("swaggerExpress.runner.swagger.paths: ", swaggerExpress.runner.swagger.paths);
});
