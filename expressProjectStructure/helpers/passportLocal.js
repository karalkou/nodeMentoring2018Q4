const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const users = require('../mocks/users');

passport.use('local', new LocalStrategy({
    usernameField: 'userName',
    passwordField: 'password',
    session: false
}, function (userName, password, done) {
    let user = users.find(user => user.userName === userName);

    if (!user || user.password !== password) {
        done(null, false);
    } else {
        done(null, user);
    }
}));

module.exports = passport;
