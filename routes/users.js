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
    successRedirect: '/',
    failureRedirect: '/failbot'
  })
);

router.post('/register', (request, response, next) => {
  const { name, email, password } = request.body;

  console.log({name, email, password});

  User.create(name, email, password)
    .then(id => {
      request.login({ name, password }, error => {
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