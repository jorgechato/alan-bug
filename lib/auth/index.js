var express = require('express'),
session = require('express-session'),
passport = require('passport'),
PassportLocal = require('passport-local').Strategy;
swig = require('swig'),
bodyParser = require('body-parser'),
cookieParser = require('cookie-parser'),
flash = require('connect-flash'),
validator = require('validator');

//local variables
var app = express();
var User = require('../users/model');

app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json('application/json'));// get information from html forms

//Config views
app.engine('html', swig.renderFile);

app.engine('html',swig.renderFile);
app.set('view engine','html');
app.set('views','./dist/views');

app.set('view cache', false);
swig.setDefaults({ cache: false});

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

//routes
var routesConfig = require('./routes')(app,passport,validator);

module.exports = app;
