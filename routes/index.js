const express = require('express');
const router = express.Router();

const requireAuthentication = require('../auth/requireAuthentication');
// const Game = require('../db/games');


/* GET home page. */

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Login' });
});


module.exports = router;
