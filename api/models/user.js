const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  name : { type :String, trim :true, required : true},
  email : { type : String, trim : true, required : true},
  pass : { type : String, required : true},
  isAdmin : { type : Boolean, default: false} 
});

module.exports = mongoose.model('User', UserSchema);