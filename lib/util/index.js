var randToken = require('rand-token');

var Token = require('../models/token');

return {
  //return [-1] token used, you should try again, callback(token,sended)
  saveInvitation(to,from,callback){
    var token = randToken.generate(16);

    Token.findOne({'to':to},function(err,data){
      if(data && typeof callback == 'function') callback(token,false);
      if(!err){
        Token.findOne({'token':token},function(err,data){
          if(data) return -1;
          if(!err){
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
      }
    });
  }
};
