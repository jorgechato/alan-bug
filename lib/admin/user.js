var express = require('express'),
swig = require('swig'),
flash = require('connect-flash'),
//bodyParser = require('body-parser'),
validator = require('validator');

//locals
var app = express();
var util = require('../util');
var User = require('../users/model');
//app.use(bodyParser.urlencoded({ extended: false }));

//Config views
app.engine('html',swig.renderFile);
app.set('view engine','html');
app.set('views','./dist/views');

app.set('view cache', false);
swig.setDefaults({ cache: false});
app.use(flash());

//routes
app.route('/admin/users')
.get(util.isAdmin,function(req,res){
  util.getUsers(function(users){
    res.render('admin/users',{
      message:req.flash('sendInvitation'),
      'users':users,
    });
  });
})
.post(util.isAdmin,function(req,res){
  var email = req.body.email;
  if(!validator.isEmail(email)){
    req.flash('sendInvitation','Correo no válido.');
    return res.redirect('/admin/users');
  }else{
    util.saveInvitation(email,req.user.email,function(token,sended){
      if(!sended) req.flash('sendInvitation','Este correo ya tiene una invitación.');
      res.redirect('/admin/users');
    });
  }
});

app.get('admin/user/delete/:id',util.isAdmin,function(req,res){
  res.send(200);
});

app.route('/admin/user/:id')
.get(util.isAdmin,function(req,res){
  util.getUser(req.params.id,function(user){
    res.render('admin/user',{'user':user});
  });
})
.put(util.isAdmin,function(req,res){
  res.send(200);
})

module.exports = app;
