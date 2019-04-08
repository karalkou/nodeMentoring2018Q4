'use strict';

const SwaggerExpress = require('swagger-express-mw');
const app = require('express')();

const connectToDB = require('./database/database');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');


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
        .then(
            () => {
                const swaggerDocument = YAML.load('./api/swagger/swagger.yaml');
                app.use('/api/v1', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
                app.listen(port, () => {
                    console.log(`Express server for swagger listening on port ${port}`);
                })
            }
        )
        .catch(err => console.log(err));
});
