var mongoose = require('mongoose');

var opt = {mongos : true};

mongoose.connect('mongodb://localhost/'+'turing',function(err,res){
  if(err) {
    console.log('ERROR: connecting to Database. ' + err);
  } else {
    console.log('Connected to Database');
  }
});

module.exports = mongoose;
