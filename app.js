const express = require('express');
const app = express();
const path = require('path');
const server = require('http').createServer(app);
const io = require('socket.io').listen(server);
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

var game = require('./routes/game');

server.listen(process.env.PORT || 8080);

const index = require('./routes/index');
const users = require('./routes/users');
const test = require('./routes/test');
const lobby = require('./routes/lobby');
const db = require('./db/DbInit');

const list_users = [];
const connections = [];

io.sockets.on('connection', function(socket){
    connections.push(socket);
    console.log('Connected: %s sockets connected', connections.length);

    //Disconnect
    socket.on('disconnect', function(data){
        list_users.splice(list_users.indexOf(socket.username),1);
        updateUsernames();
        connections.splice(connections.indexOf(socket), 1);
        console.log('Disconnected: %s sockets connected', connections.length);
    });

    //Send Message
    socket.on('send message', function(data){
        io.sockets.emit('new message', {msg:data, user:socket.username});
    });

    //New User
    socket.on('new user', function(data, callback){
        callback(true);
        socket.username = data;
        list_users.push(socket.username);
        updateUsernames();
    });

    function updateUsernames(){
        io.sockets.emit('get users', list_users);
    }
})

if(process.env.NODE_ENV === 'development') {
    require("dotenv").config();
}



console.log('Server running...');


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', index);
app.use('/', lobby);
app.use('/users', users);
app.use('/test', test);
app.use('/lobby', lobby);
app.use('/game', game);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
