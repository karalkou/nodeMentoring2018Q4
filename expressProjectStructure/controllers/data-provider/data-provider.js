const path = require('path');
const { readFile } = require('fs');
const { promisify } = require('util');

const readFileAsync = promisify(readFile);

class DataProvider {

    constructor() {
        readFileAsync(path.resolve(__dirname, './../../mocks', 'users.json'))
            .then(
                text => this.users = JSON.parse(text)
            )
            .catch(errHandler);

        readFileAsync(path.resolve(__dirname, './../../mocks', 'products.json'))
            .then(
                text => this.products = JSON.parse(text)
            )
            .catch(errHandler);

        readFileAsync(path.resolve(__dirname, './../../mocks', 'reviews.json'))
            .then(
                text => this.reviews = JSON.parse(text)
            )
            .catch(errHandler);
    }

    readUsers() {
        return this.users;
    }

    readProducts() {
        return this.products;
    }

    readProductById(id) {
        return this.products.find((product) => product.id === Number(id));
    }

    findProductReviews(id) {
        return this.reviews.find((product) => product.product_id === Number(id));
    }

    addProduct(product) {
        if (product && product.name) {
            product.id = getNextId(this.products);
            this.products.push(product);
            return product;
        }
        return 400;
    }
}

function errHandler(err) {
    console.error(err);
}

function getNextId(products) {
    return products.length + 1;
}

module.exports = DataProvider;
