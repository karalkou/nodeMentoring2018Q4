// user.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    age: {
        min: [12, 'Age must be more than 12'],
        max: 122,
        type: Number,
    },
    name: {
        required: [true, 'User name is required'],
        type: String,
    },
    email: {
        required: [true, 'User email is required'],
        type: String,
        validate: value => validator.isEmail(value),
    },
    password: {
        required: [true, 'User email is required'],
        type: String,
        validate: {
            validator: value => value.length >= 5,
            message: 'Password length should be at least 5 symbols length',
        },
    },
    company: {
        type: String,
    },
});

module.exports = mongoose.model('User', userSchema);
