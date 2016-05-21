var express = require('express'),
swig = require('swig'),
flash = require('connect-flash'),
validator = require('validator');

//locals
var app = express();
var util = require('../util');

//Config views
app.engine('html',swig.renderFile);
app.set('view engine','html');
app.set('views','./dist/views');

app.set('view cache', false);
swig.setDefaults({ cache: false});
app.use(flash());

//routes
app.route('/admin/invitations')
.get(util.isAdmin,function(req,res){
  var search = req.query.search;

  util.findToken(search ,function(tokens){
    return res.render('admin/invitations',{
      message:req.flash('sendInvitation'),
      'tokens':tokens,
      'search':search,
      'path' : 'invitation',
    });
  });
})
.post(util.isAdmin,function(req,res){
  var email = req.body.email;
  if(!validator.isEmail(email)){
    req.flash('sendInvitation','Correo no válido.');
    return res.redirect('/admin/invitations');
  }else{
    util.saveInvitation(email,req.user.email,function(token,sended){
      if(!sended) req.flash('sendInvitation','Este correo ya tiene una invitación.');
      return res.redirect('/admin/invitations');
    });
  }
});

app.get('/admin/invitation/delete/:id',util.isAdmin,function(req,res){
  var id = req.params.id;
  util.deleteToken(id, function(){
    return res.redirect('/admin/invitations');
  });
});

app.get('/admin/invitation/:id',util.isAdmin,function(req,res){
  //TODO send invitation by email
});

module.exports = app;
