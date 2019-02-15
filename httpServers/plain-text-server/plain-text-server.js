const http = require('http');
const port = 3000;

const requestHandler = (req, res) => {
    const { url, method } = req;
    console.log(`url: ${url}; method: ${method}`);

    res.writeHead(
        200,
        {
            'Content-Type': 'text/plain'
        }
    );
    res.end('Hello, World!')
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
