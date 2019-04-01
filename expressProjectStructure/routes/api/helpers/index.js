const respond = function respond(data, res) {
    if (data === 400) {
        res.writeHead(400);
        res.end('400 Bad request');
    } else if (!data) {
        res.writeHead(404);
        res.end('404 Not found');
    } else {
        res.writeHead(200, { 'Content-Type': 'application/json; charset=utf8' });
        res.end(JSON.stringify(data));
    }
};

module.exports = {
    respond,
};
