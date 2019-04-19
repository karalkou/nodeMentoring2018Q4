// product.js
const mongoose = require('mongoose');
const { mongo: { collectionsToModelMap } } = require('./../../config/consts');
const timestampPlugin = require('./plugins/timestamp');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        lowercase: true,
        required: [true, 'Product name is required'],
    },
    color: {
        type: String,
        lowercase: true,
        required: [true, 'Product color is required'],
    },
    isFavorite: {
        type: Boolean,
        required: [true, 'Product isFavorite is required'],
    },
    reviews: {
        type: Number,
        min: [0, 'Reviews must be a positive number'],
    },
});

productSchema.plugin(timestampPlugin);

module.exports = mongoose.model(collectionsToModelMap.products, productSchema);
