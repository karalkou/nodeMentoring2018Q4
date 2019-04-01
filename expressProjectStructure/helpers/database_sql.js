const fs = require('fs');
const path = require('path');
const models = require('../database_sql/models');

const { User, Product } = models;
const usersPath = path.resolve(`${__dirname}/../mocks/users.json`).replace(/\\/g, '/');
const productsPath = path.resolve(`${__dirname}/../mocks/products.json`).replace(/\\/g, '/');

const users = JSON.parse(fs.readFileSync(usersPath, 'utf8'));
const products = JSON.parse(fs.readFileSync(productsPath, 'utf8'));

const findAll = {
    where: true,
    truncate: true,
};

module.exports = function DBInit(sequelize) {
    models.User.destroy(findAll);
    models.Product.destroy(findAll);

    sequelize.sync().then(() => {
        users.forEach(user => User.create(user));
        products.forEach(product => Product.create(product));
    });
};
