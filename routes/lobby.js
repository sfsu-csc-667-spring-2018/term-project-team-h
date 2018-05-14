var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
   // res.sendFile(__dirname + '/lobby.ejs');
   // console.log('REQ',req.user.user_name );
   res.render('lobby', { title: 'Lobby', name: "yes" });
   // console.log('Dirname', __dirname);
});

module.exports = router;