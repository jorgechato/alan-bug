var randToken = require('rand-token');

var Token = require('../models/token');

return {
  //return [-1] token used, [0] user already invited and [1] successfully sended
  saveInvitation(to,from){
    var token = randToken.generate(16);

    Token.findOne({'to':to},function(err,data){
      if(data) return 0;
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
              return 1;
            });
          }
        });
      }
    });
  }
};
