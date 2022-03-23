const mongoose = require('mongoose');

const CouponSchema = mongoose.Schema({
  code : { type: String, required: true, unique: true },
  product : { type : mongoose.Schema.Types.ObjectId, ref: 'Product', required : true},
  discount : {type : Number, required : true},
  maxUses : { type : Number , default: 1},
  shop : {type : mongoose.Schema.Types.ObjectId, ref: 'Shop'},
});

module.exports = mongoose.model('Coupon', CouponSchema);
