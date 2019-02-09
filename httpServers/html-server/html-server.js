const http = require('http');
const fs = require('fs');
const through2 = require('through2');
const port = 3000;

const msg = 'Hello, world!!';

const requestHandler = (req, res) => {
    const {url, method} = req;
    console.log(`url: ${url}; method: ${method}`);

    res.writeHead(
        200,
        {
            'Content-Type': 'text/html'
        }
    );

    const replaceMsg = str => str.replace('{message}', msg);

    fs.createReadStream('index.html', 'utf8')
        .pipe(through2(
            (data, enc, cb) => {
                return (
                    cb(null, Buffer.from(replaceMsg(data.toString())))
                )
            })
        )
        .pipe(res);
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
