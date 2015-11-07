var mongoose = require('../models/models'),
bcrypt   = require('bcrypt-nodejs'),
Schema = mongoose.Schema;

var userSchema = new Schema({
  date : Date,
  username : String,
  email : String,
  password : String,
  web : String,
  github : String,
  avatar : String,
  role : String
});

//change _id to id
userSchema.set('toJSON', {
  transform: function (doc, ret, options) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  }
});

// generating a hash
userSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

var Users = mongoose.model('User',userSchema);

module.exports = Users;
