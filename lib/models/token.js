var mongoose = require('models'),
Schema = mongoose.Schema;

var tokenSchema = new Schema({
  date : Date,
  token : String,
  to : String,
  from : Object
});

var Tokens = mongoose.model('Token',tokenSchema);

module.exports = Tokens;
