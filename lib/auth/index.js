var express = require('express'),
session = require('express-session'),
passport = require('passport'),
UserInfo = require('passport-local').Strategy;
swig = require('swig'),
bodyParser = require('body-parser'),
cookieParser = require('cookie-parser');

//local variables
var app = express();
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.json('application/json'));// get information from html forms

//Config views
app.engine('html',swig.renderFile);
app.set('view engine','html');
app.set('views','./dist/views');

//passport config
app.use(session({
  secret:'test',
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

//routes
////signup
var signUpRoutes = app.route('/signup');
signUpRoutes
.post(function(req,res){
  passport.use(new UserInfo(function(username,email){

  }));
})
.get(function(req,res){
  var query = req.query.q;
  res.render('index.html');
});

////login
var loginRoutes = app.route('/login');
loginRoutes
.post(passport.authenticate('local',{successRedirect: '/',failureRedirect: '/login',failureFlash: true}),function(req,res){

})
.get(function(req,res){
  res.render('index.html');
});

////logout
app.get('/logout',function(req,res){
  req.logout();
  res.redirect('/login');
});

module.exports = app;
