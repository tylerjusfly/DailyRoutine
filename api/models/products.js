const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema({
  name : { type : String , required : true},
  desc : { type : String, default : ''},
  productType : {
    type : String , 
    enum : ['SerialNumber', 'Service', 'License'],
    default : 'SerialNumber'
  },
  serialCode :  {type : String , default : ''},
  image : {type : String , default : ''},
  price : { type : Number , default : ''},
  stockCount :  {type : Number , default: 0},
  shop : {type : mongoose.Schema.Types.ObjectId, ref: 'Shop'},
});

module.exports = mongoose.model('Product', ProductSchema);