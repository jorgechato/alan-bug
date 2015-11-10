var express = require('express'),
swig = require('swig');

//locals
var app = express();
var util = require('../util');
var User = require('../users/model');

//Config views
app.engine('html',swig.renderFile);
app.set('view engine','html');
app.set('views','./dist/views');

app.set('view cache', false);
swig.setDefaults({ cache: false});

//routes
app.route('/admin/user')
.get(util.isAdmin,function(req,res){
  util.getUsers(function(users){
    res.render('admin/user',{'users':users});
  });
});

app.get('admin/user/delete/:id',util.isAdmin,function(req,res){
  res.send(200);
});

app.route('/admin/user/:id')
.get(util.isAdmin,function(req,res){
  res.send(200);
})
.put(util.isAdmin,function(req,res){
  res.send(200);
})

module.exports = app;