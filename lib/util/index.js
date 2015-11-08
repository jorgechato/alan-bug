var randToken = require('rand-token');

var Token = require('../models/token');

var checkInvitation = function(token,email,callback){
  Token.findOne({$and:[{'token':token},{'to':email}]},function(err,token){
    if(!err && typeof callback == 'function') callback(token, token !== null);
  });
};

module.exports = {
  checkInvitation : checkInvitation,

  //return [-1] token used, you should try again, callback(token,sended)
  saveInvitation : function(to,from,callback){
    var token = randToken.generate(16);

    Token.findOne({$or:[{'to':to},{'token':token}]},function(err,data){
      if(data) return -1;
      if(!err){
        //User already with a valid invitation
        if(data.email == to && typeof callback == 'function') return callback(data,false);
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
  }
};
