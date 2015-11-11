var randToken = require('rand-token');

var Token = require('../models/token');
var User = require('../users/model');

var checkInvitation = function(token,email,callback){
  Token.findOne({$and:[{'token':token},{'to':email}]},function(err,token){
    if(!err && typeof callback == 'function') callback(token, token !== null);
  });
};

module.exports = {
  checkInvitation : checkInvitation,

  //callback(token,sended)
  //sended = true => email sended
  //sended = false => user already with invitation
  saveInvitation : function(to,from,callback){
    var token = randToken.generate(16);

    Token.findOne({'to':to},function(err,data){
      if(!err){
        //User already with a valid invitation
        if(data && data.to == to && typeof callback == 'function') return callback(data,false);
        var newToken = new Token();

        newToken.date = new Date();
        newToken.token = token;
        newToken.to = to;
        newToken.from = from;

        newToken.save(function(err){
          if(err) throw err;
          if(typeof callback == 'function') callback(newToken,true);
        });
      }
    });
  },

  deleteInvitation : function(token,callback){
    Token.remove({'token':token},function(err){
      if(!err && typeof callback == 'function') callback();
    });
  },

  getInvitation : function(token,callback){
  },

  isLoggedIn : function(req, res, next) {
    if (req.isAuthenticated()) return next();

    res.redirect('/login');
  },

  isAdmin : function(req, res, next){
    if (req.isAuthenticated() && req.user.role == 'admin') return next();
    else if (req.isAuthenticated()) return res.redirect('/');

    res.redirect('/login');
  },

  getUsers : function(callback){
    User.find({},function(err, users){
      if(!err && typeof callback == 'function') callback(users);
    });
  },

  getUser : function(param,callback){
    User.findOne({$or:[{"_id":param},{"username":param}]},function(err, user){
      if(!err && typeof callback == 'function') callback(user);
    });
  },

  updateUser : function(user, callback){
    User.update({"_id":user.id},user,function(err){
      if(!err && typeof callback == 'function') callback();
    });
  }
};
