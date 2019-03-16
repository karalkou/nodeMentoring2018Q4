const app = require('./app');
const port = process.env.PORT || 9001;
const connectToDB = require('./database/database');

connectToDB
    .then(
        () => app.listen(
            port,
            () => console.log(`App is listening on port ${port}​!`)
        )
    )
    .catch(err => console.log(err));
