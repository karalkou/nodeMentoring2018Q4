// city.js
const mongoose = require('mongoose');

const citySchema = mongoose.Schema({
    name: {
        required: [true, 'Name is required'],
        type: String,
    },
    country: {
        required: [true, 'Country is required'],
        type: String,
    },
    capital: {
        required: [true, 'isCapital is required'],
        type: Boolean,
    },
    location: {
        lat: {
            required: [true, 'Latitude is required'],
            type: String,
        },
        long: {
            required: [true, 'Longitude is required'],
            type: String,
        },
    },
});

module.exports = mongoose.model('City', citySchema);
