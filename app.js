let createError = require('http-errors');
let express = require('express');
let handlebars = require('handlebars');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let GitHubStrategy = require('passport-github').Strategy;
const dotenv = require("dotenv");
const Sequelize = require('sequelize');
//const sequelize = new Sequelize('postgres://postgres@localhost:5432/mylocaldb');
const sequelize = new Sequelize('postgres://hmnkedwbonngcv:659c311e16d62673193fc81c722d8ee05b75dec14558451591d9962a4e5d641b@https://chilangosproj.herokuapp.com:5432/deifsfdnk4q9p5') 


let indexRouter = require('./routes/index');
let usersRouter = require('./routes/users');
const setupAuth = require('./auth');

dotenv.load();

let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

setupAuth(app);

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
