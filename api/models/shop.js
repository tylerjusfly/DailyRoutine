const mongoose = require('mongoose');

const ShopSchema = mongoose.Schema({
    shopName : {type : String, required : true},
    description : {type : String, default : ""},
    currencyType : {
      type : String, 
      enum : ['USD', 'EUR', 'NGN', 'CAD'],
      default : 'USD'
    },
    customDomain : {type : String, default : ""},
    paymentMethod : {
      type : String,
      enum : ['cryptocurrency', 'paypal', 'stripe'],
      default : 'cryptocurrency'
    },
    supportEmail : {type : String, default : ""},
    shopOwner : {type : mongoose.Schema.Types.ObjectId, ref: 'User'},
    sellerNotes : {type : String, default : ""},
    history : {
      type : Array,
      default : []
    }
}, {timestamps : true}
);

ShopSchema.statics.shopNameExist = async function(shopName) {
  try {
    const shop = await this.findOne({shopName})
    if(shop) return false

    return true;
  } catch (error) {
    res.status(400).json(error)
    return false;
  }

}

module.exports = mongoose.model('Shop', ShopSchema);