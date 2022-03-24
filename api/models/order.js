const mongoose = require('mongoose');

const OrderSchema = mongoose.Schema({
  productId : { type : mongoose.Schema.Types.ObjectId, ref: 'Product', required : true},
  name : {type :String, required : true},
  quantity : { type : Number , default: 1},
  price : {type : Number, required : true},
  discount : {type : Number, required : false},
  total : {type : Number, required : true},
  email : {type :String, required : true},
  status : {
    type : String,
    enum : ['Complete', 'Incomplete'],
    default : 'Incomplete'
  }
}, {timestamps : true}
);

module.exports = mongoose.model('Order', OrderSchema);