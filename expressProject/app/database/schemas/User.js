const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: String,
    password: String,
});

userSchema.methods.sayHello = function () {
    return `This is a shared function: ${this.username}`
};

module.exports = userSchema;
