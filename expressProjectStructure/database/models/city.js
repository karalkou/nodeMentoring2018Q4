// city.js
const mongoose = require('mongoose');
const { mongo: { collectionsToModelMap } } = require('./../../config/consts');
const timestampPlugin = require('./plugins/timestamp');

const citySchema = mongoose.Schema({
    name: {
        type: String,
        lowercase: true,
        required: [true, 'Name is required'],
    },
    country: {
        type: String,
        lowercase: true,
        required: [true, 'Country is required'],
    },
    capital: {
        type: Boolean,
        lowercase: true,
        required: [true, 'isCapital is required'],
    },
    location: {
        lat: {
            type: String,
            required: [true, 'Latitude is required'],
        },
        long: {
            type: String,
            required: [true, 'Longitude is required'],
        },
    },
});

citySchema.plugin(timestampPlugin);

module.exports = mongoose.model(collectionsToModelMap.cities, citySchema);
