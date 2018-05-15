const socket_io = require('socket.io');
const cookieParser = require('cookie-parser');

const io = socket_io();

//key: table number value: array of players
//DB VALUES
let num = 0;
let players = [];
let stillIn = [];
let bet = 0;
let currentPlayer = "";
let pot = 0;
let blindAmount = 20, bigBlind = "";


io.on('connection', function(socket){
	console.log('A User Connected');
	socket.on('chat message', function(msg){
		console.log('message: ' + msg);
		io.emit('chat message', msg)
	});


	socket.on('disconnect', function(data){
		//remove player from table
		console.log('A User Disconnected');
		io.emit(data.table, {player: data.player, action: "disconnect"});
	});


	socket.on('bet', function(data){
		//TODO: update pot
		//		update nextPlayer
		//		send card if necessary
		let nextPlayer;
		io.emit(data.table, {action: "bet", amount: data.amount, player: data.player, nextPlayer: nextPlayer});
	});

	socket.on('fold', function (data){
		//TODO: take player out of rotation
		//		check if there is a winner, award the winner, then reset the game
		//		update player Turn
		//		update pot if necessary
		//
        io.emit(data.table, {action: "fold", player: data.player});

    });

	socket.on('call', function(data){
		/*TODO: update nextPlayer
		* 		update pot
		* 		update player's bank
		* 		check if a card needs to be sent
		* */
		let nextPlayer;
        io.emit(data.table, {action: "call", player: data.player, amount: data.amount, nextPlayer: nextPlayer});
	});

	socket.on('new player', function(data){
		//TODO: add player to db
		//		get other Players in table
		players.push(data.player);
		let value = parseInt(Math.random()*13) + 1;
		io.emit(data.table, {player: data.player, action: 'new user', seat: num++, allPlayers: players});
		io.emit(data.table, {player: data.player, action: 'deal', leftvalue: value, leftsuit: "spades", rightvalue: value, rightsuit: "diamonds"});
	});

	socket.on('check', function(data){
		//update player
		io.emit(data.table, {player: player, action: 'check'});
	});



});

// socketAPI.sendNotification = function(){
// 	io.sockets.emit('hello', {msg: 'Hello World!'});
// }


module.exports = io;