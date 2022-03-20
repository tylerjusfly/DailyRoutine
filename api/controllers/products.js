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

  getAll : async(req, res, next) => {
    const alls = await Product.find().populate('shop', 'shopName')
    res.status(200).send({
      message : "Getting all Products",
      count : alls.length,
      products : alls.map( all => {
        return {
          name : all.name,
          shop : all.shop,
          _id : all._id,
          request : {
            type : 'GET',
            url : `localhost:3000/shop/${all.shop._id}/products/${all._id}`
          }
        }
      })
    });
  },

  getById : async(req, res, next) => {
    const id = req.params.productId;
    const product = await Product.findById(id)
    if(!product){  
      res.status(400).json({message : "No valid id entry for the provided id."})
    }

    try {
      res.status(200).json({
        message : "Get Product by Id",
        product : product
      })
    } catch (err) {
      res.status(500).json({
        error : err
      })
    };
      
    }
    







}