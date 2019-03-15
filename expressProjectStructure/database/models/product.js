// product.js
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        required: [true, 'Product name is required'],
        type: String,
    },
    color: {
        required: [true, 'Product color is required'],
        type: String,
    },
    isFavorite: {
        required: [true, 'Product isFavorite is required'],
        type: Boolean,
    },
    reviews: {
        min: [0, 'Reviews must be a positive number'],
        type: Number,
    },
});

module.exports = mongoose.model('Product', productSchema);
