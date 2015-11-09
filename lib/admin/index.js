var express = require('express'),
flash = require('connect-flash'),
swig = require('swig');
var util = require('../util');

//local variables
var app = express();
var Event = require('../events/model');

//Config views
app.engine('html',swig.renderFile);
app.set('view engine','html');
app.set('views','./dist/views');

app.set('view cache', false);
swig.setDefaults({ cache: false});

app.use(flash());

//main
app.get('/admin',util.isAdmin,function(req,res){
  res.render('admin');
});
//routes
var user = require('./user');
app.use(user);

module.exports = app;
