const http = require('http');
const port = 3000;

const requestHandler = (req, res) => {
    const {url, method} = req;
    console.log(`url: ${url}; method: ${method}`);

    req.pipe(res);
};

const server = http
    .createServer()
    .on('request', requestHandler);

server.listen(port, (err) => {
    if (err) {
        console.log('something bad happened', err)
    }

    console.log(`server is listening on ${port}`)
});
