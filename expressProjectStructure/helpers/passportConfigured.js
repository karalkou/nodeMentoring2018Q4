const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const users = require('../mocks/users');
const { facebookPassport, googlePassport } = require("./../config/consts");

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

passport.use(
    "facebook",
    new FacebookStrategy(
        {
            clientID: facebookPassport.app_id,
            clientSecret: facebookPassport.app_secret,
            callbackURL: facebookPassport.callback
        },
        (accessToken, refreshToken, profile, cb) => {
            let user = users.find(user => user.displayName === profile.displayName);

            if (!user) {
                cb(null, false);
            } else {
                cb(null, user);
            }
        }
    )
);

passport.use(
    "google",
    new GoogleStrategy(
        {
            clientID: googlePassport.clientID,
            clientSecret: googlePassport.clientSecret,
            callbackURL: googlePassport.callbackURL,
            passReqToCallback: true
        },
        (request, accessToken, refreshToken, profile, done) => {
            let user = users.find(user => user.email === profile.email);

            if (!user) {
                return done(null, false);
            } else {
                return done(null, user);
            }
        }
    )
);

module.exports = passport;
