var mongoose = require('mongoose');

var opt = {mongos : true};
var mongo = require('../../config.json').mongo;

mongoose.connect(mongo.prefix+'://'+mongo.url[0]+'/'+mongo.db,function(err,res){
  if(err) {
    console.log('ERROR: connecting to Database. ' + err);
  } else {
    console.log('Connected to Database');
  }
});

module.exports = mongoose;
