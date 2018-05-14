var express = require('express');
var router = express.Router();
const Games = require('../db/game');

/* GET home page. */
router.get('/', function(req, res, next) {

    Games.availableGames()
        .then(data => {
           // console.log('DATA', data);
            res.render('lobby', { title: 'Lobby', name: req.user.user_name, availabaleGame: data });
        })
        .catch(err => {
            req.flash('error', 'There was an error, please try again')
            res.redirect('/lobby');
            console.log('ERROR: ', err)
        })
});

module.exports = router;