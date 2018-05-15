const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const User = require('../db/users');

const lookup = (username, password, done) => {
    User.find(username)
        .then(({user_id, user_password, user_name}) => {
            console.log(username);
            console.log(password);
            if (bcrypt.compareSync(password, user_password)) {
                console.log("Success!");
                done(null, {user_id, user_name});
            } else {
                done('Please verify your username and password', false);
            }
        })
        .catch(error => {
            console.log(error);
            done('Please verify your username and password', false);
        });
};

const strategy = new LocalStrategy(
    {
        usernameField: 'username',
        passwordField: 'password',
        userIdField: 'user_id'
    },
    lookup
);

passport.serializeUser(User.serialize);
passport.deserializeUser(User.deserialize);
passport.use(strategy);

module.exports = passport;