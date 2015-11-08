var express = require('express'),
swig = require('swig'),
bodyParser = require('body-parser'),
flash = require('connect-flash');
var util = require('../util');

//local variables
var app = express();
var User = require('../users/model');
var Event = require('../events/model');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json('application/json'));// get information from html forms

//Config views
app.engine('html',swig.renderFile);
app.set('view engine','html');
app.set('views','./dist/views');

app.set('view cache', false);
swig.setDefaults({ cache: false});

app.use(flash());

//routes
var adminRoutes = app.route('/admin/:section?/:param?');
adminRoutes
.get(util.isAdmin,function(req,res){
  if(req.user && req.user.role == 'user') res.send('ok');
  else res.redirect('/error/admin');
})

module.exports = app;
