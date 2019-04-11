const MongoClient = require('mongodb').MongoClient;
const { url: mongoDbUrl } = require('./../config/db');

let mongodb;

function connect(callback) {
    MongoClient.connect(mongoDbUrl, (err, db) => {
        mongodb = db;
        callback();
    });
}

function get() {
    return mongodb;
}

function close() {
    mongodb.close();
}

module.exports = {
    connect,
    get,
    close
};
