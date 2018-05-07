var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

    res.sendFile(__dirname + '/lobby.ejs');
    res.render('lobby', { title: 'Welcome to the Lobby' });
    // console.log('Dirname', __dirname);
});

module.exports = router;