const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  email : { type : String, required : true},
  pass : { type : String, required : true},
  isAdmin : { type : Boolean, default: false} 
});

module.exports = mongoose.model('User', UserSchema);