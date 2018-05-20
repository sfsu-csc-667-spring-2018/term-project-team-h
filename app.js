const express = require('express');
const app = express();
const path = require('path');

const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const passport = require('./auth');
const session = require('express-session');

app.use(session({
    secret: 'testsecret',
    resave: true,
    saveUninitialized: true
}));


app.use(passport.initialize());
app.use(passport.session());

if(process.env.NODE_ENV === 'development') {
    require("dotenv").config();
}

const index = require('./routes/index');
const users = require('./routes/users');
const test = require('./routes/test');
const lobby = require('./routes/lobby');
const game = require('./routes/game');
const db = require('./db/index');


console.log('Server running...');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.io = require('./sockets');






app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', index);
app.use('/', index);
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
