var express = require('express'),
session = require('express-session'),
passport = require('passport'),
PassportLocal = require('passport-local').Strategy;
cookieParser = require('cookie-parser'),
flash = require('connect-flash'),
validator = require('validator');

//local variables
var app = express();
var User = require('../users/model');

app.use(cookieParser()); // read cookies (needed for auth)

//passport config
var passportConfig = require('./passport')(passport,User,PassportLocal,validator);

app.use(session({
  secret:'alan turing',
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

//router
var routes = require('./routes');
app.use(routes);
//var routesConfig = require('./routes')(app,passport,validator);

module.exports = app;
