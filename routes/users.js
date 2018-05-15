const express = require('express');
const router = express.Router();
const passport = require('../auth');
const User = require('../db/users');

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

router.post('/login',
    passport.authenticate('local', {
        successRedirect: '/lobby',
        failureRedirect: '/failbot'
    })
);

const default_money = 1000;

router.post('/register', (request, response, next) => {
    let {name, email, password} = request.body;

    User.create(name, email, password, default_money)
        .then(resp => {
            console.log('resp', resp);
            let user_id = resp.user_id;
            request.login({name, password, user_id}, error => {
                if (error) {
                    return next(error);
                } else {
                    return response.redirect('/lobby');
                }
            });
        })
        .catch(error => {
            console.log(error);
            response.redirect('/failbot');
        });
});

module.exports = router;