const socket_io = require('socket.io');
const cookieParser = require('cookie-parser');
// const session = require('express-session');

const io = socket_io();
// const socketAPI = {};

// socketAPI.io = io;

var players = [], index = 0;

io.on('connection', function(socket){
	console.log('A User Connected');
	
	socket.on('chat message', function(msg){
		console.log('message: ' + msg);
		io.emit('chat message', msg)
	});

	socket.on('disconnect', function(){
		console.log('A User Disconnected');
	});

	socket.on('bet', function(data){
		io.emit('bet', data);
        index = (index + 1) % players.length;
        io.emit('setTurn', {player: players[index], amount: data.amount});
	});

	socket.on('fold', function (data){
		io.emit('fold', data);
        index = (index + 1) % players.length;
        io.emit('setTurn', {player: players[index], amount: 0});
    });

	socket.on('call', function(data){
		index = (index + 1) % players.length;
		io.emit('call', {player: data.player, amount: 10});
        io.emit('setTurn', {player: players[index], amount: 0});
	});

	socket.on('new player', function(data){
		players.push(data);
		io.emit(data, {playerIndex: players.length - 1, player: players[index], amount: 0});
        io.emit('setTurn', {player: players[index], amount: 0});
        io.emit('users', players);
	});

	socket.on('check', function(){
		io.emit('setTurn', {player: players[0], amount: 0});
	});


});

// socketAPI.sendNotification = function(){
// 	io.sockets.emit('hello', {msg: 'Hello World!'});
// }

module.exports = io;