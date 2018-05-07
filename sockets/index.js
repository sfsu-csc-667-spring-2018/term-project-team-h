const socket_io = require('socket.io');
const cookieParser = require('cookie-parser');
// const session = require('express-session');

const io = socket_io();
// const socketAPI = {};

// socketAPI.io = io;

io.on('connection', function(socket){
	console.log('A User Connected');
	
	socket.on('chat message', function(msg){
		console.log('message: ' + msg);
		io.emit('chat message', msg)
	});

	socket.on('disconnect', function(){
		console.log('A User Disconnected');
	});
});

// socketAPI.sendNotification = function(){
// 	io.sockets.emit('hello', {msg: 'Hello World!'});
// }

module.exports = io;