// city.js
var mongoose = require('mongoose');

// Setup schema
var citySchema = mongoose.Schema({
    name: String,
    country: String,
    capital: Boolean,
    location: {
        lat: String,
        long: String
    }
});

module.exports = mongoose.model('City', citySchema);
