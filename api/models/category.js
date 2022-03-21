const mongoose = require('mongoose');

const CategorySchema = mongoose.Schema({
  name : { 
    type :String, 
    trim :true, 
    required : true,
    maxlength : 40
  }
}, {timestamps : true}
);

module.exports = mongoose.model('Category', CategorySchema);