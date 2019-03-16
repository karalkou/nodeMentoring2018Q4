// user.js
const mongoose = require('mongoose');
const { isEmail } = require('validator');
const { mongo: { collectionsToModelMap } } = require('./../../config/consts');
const timestampPlugin = require('./plugins/timestamp');

const userSchema = new mongoose.Schema({
    age: {
        type: Number,
        min: [12, 'Age must be more than 12'],
        max: 122,
    },
    name: {
        type: String,
        lowercase: true,
        required: [true, 'User name is required'],
    },
    email: {
        type: String,
        required: [true, 'User email is required'],
        validate: {
            validator: value => isEmail(value),
            message: 'Email is not valid'
        }
    },
    password: {
        type: String,
        required: [true, 'User email is required'],
        validate: {
            validator: value => value.length >= 5,
            message: 'Password length should be at least 5 symbols length',
        },
    },
    company: {
        type: String,
        lowercase: true,
    },
});

userSchema.plugin(timestampPlugin);

module.exports = mongoose.model(collectionsToModelMap.users, userSchema);
