var mongoose = require('../models/models'),
Schema = mongoose.Schema;

var eventSchema = new Schema({
  date : Date,
  name : String,
  text : String,
  web : String,
  img : String,
  category : String,
  users : [Object]
});

//change _id to id
eventSchema.set('toJSON', {
  transform: function (doc, ret, options) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  }
});

var Events = mongoose.model('Event',eventSchema);

module.exports = Events;
