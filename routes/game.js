const express = require('express');
const router = express.Router();
const Games = require('../db/game');

/* GET home page. */
router.get('/', function (req, res, next) {
        // console.log('REQUEST', req.user);
            res.render('game', {title: 'Game', user: req.user.user_name, user_id: req.user.user_id});
});


//Creating new Game Room
router.post('/create', function (request, response, next) {
    Games.create(request.body.room_name, request.user.user_id)
        .then(data => {
            response.redirect('/game/' + data.game_id)
        })
        .catch(err => {
            request.flash('error', 'Something went wrong, try again later')
            response.redirect('/lobby')
            console.log('Error', err);
        })

});

//Join Existing room

router.post('/join', function (request, response, next) {
    Games.findGameById(request.body.room_id)
        .then(data => {
            data.user = request.user;
            response.redirect('/game/' + data.game_id);
        })
        .catch(err => {
            request.flash('error', 'Something went wrong, try again later')
            response.redirect('/lobby')
            console.log('Error', err);
        })
})


module.exports = router;
