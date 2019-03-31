const Product = require("../../../expressProjectStructure/database/models/product");

const getProducts = (req, res) => {
    Product.find({}, (error, products) => {
        if (error) {
            console.error("Error", error);
        }

        res.send(products);
    });
};

const addProduct = (req, res) => {
    const { id, title, price, reviews, } = req.swagger.params.body.value;

    Product.create({ id, title, price, reviews, }, (error, product) => {
        if (error) {
            console.error("Error", error);
        }

        res.send(product);
    });
};

const getProductById = (req, res) => {
    const id = req.swagger.params.id.value;

    Product.findOne({ id, }, (error, product) => {
        if (error) {
            console.error("Error", error);
        }

        res.json(product);
    });
};

const deleteProduct = (req, res) => {
    const id = req.swagger.params.id.value;

    Product.findOneAndDelete({ id, }, (error, product) => {
        if (error) {
            console.error("Error", error);
        }

        res.json(product);
    });
};

const getReviewsByProductId = (req, res) => {
    const id = req.swagger.params.id.value;

    Product.findOne({ id, }, (error, product) => {
        if (error) {
            console.error("Error", error);
        }
        console.log('reviews', product.reviews);
        res.send({
            reviews: product["reviews"],
        });
    });
};

module.exports = {
    getProducts: getProducts,
    addProduct: addProduct,
    getProductById: getProductById,
    deleteProduct: deleteProduct,
    getReviewsByProductId: getReviewsByProductId
};
