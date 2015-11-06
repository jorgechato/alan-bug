var express = require('express.io'),
passport = require('passport'),
UserInfo = require('passport-local').Strategy;
swig = require('swig');

//local variables
var login = express();

login.http().io();

login
.post('/signup/:token',function(req,res){
  passport.use(new UserInfo(function(username,email,password,github,web){

  }));
})
.post('/login',passport.authenticate('local',{
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true }),function(req,res){

  });

  module.exports = login;
