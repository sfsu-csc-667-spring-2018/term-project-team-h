var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile(__dirname + '/index.ejs');
  res.render('index', { title: 'Login' });
});

module.exports = router;
