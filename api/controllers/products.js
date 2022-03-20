const Product = require('../models/products');
const Shop = require('../models/shop');

exports.productController = {
  create : async(req, res, next) => {
    const product = {
      name : req.body.name
    }

    const shop = await Shop.findById(req.params.shopId);
    if(!shop){
      res.status(500).json({
        message : "Shop Not Found"
      });
    }
    // console.log(shop)
    const newProduct = new Product(product)
    newProduct.shop = shop
    try {
      await newProduct.save()
      res.status(200).json({
        message : `product created at ${shop.shopName} `,
        createdItem : {
            id : newProduct._id,
            name : newProduct.name,
            shopId : newProduct.shop
        }
      });
      
    } catch (error) {
      res.status(500).json(error)   
    }
  }, //end of create







}