const Product = require('../models/products');
const Shop = require('../models/shop');
const formidable = require('formidable');
const fs = require('fs')
const _ = require('lodash');

exports.productController = {
  productById : async(req, res, next, id) => {
    // console.log(req.shop)
    const product = await Product.findById(id)

    if(!product){ res.status(500).json({ message : "Product Does not exist"});}
    try {
      req.product = product
      next()
    } catch (error) {
      res.status(500).json({ message : "Product Not Found"});  
    }


  },


  create : async(req, res, next) => {
     const shop = await Shop.findById(req.params.shopId);
       if(!shop){
         res.status(500).json({ 
           message : "Shop Not Found"
          });
      }

    let form = new formidable.IncomingForm()
    form.keepExtensions = true
    form.parse(req, (err, fields, files) => {
      if(err){
        return res.status(400).json({ error : "image could not be upoaded"});
      }

      // check for all fields
      const {name, category} = fields
      if(!name || !category){
        return res.status(400).json({ error : "All fields are required"});
      }
      let products = new Product(fields);
      products.shop = shop

      if(files.image){
        console.log('FILES PHOTO :', files.image)
        // if file size is greater than 1mb == 1000000
        if (files.image.size > 1000000){
          return res.status(400).json({ error : "image should be less than 1mb "});
        }
        products.image.data = fs.readFileSync(files.image.filepath)
        products.image.contentType = files.image.mimetype
      }

        products.save((err, data) => {
          if(err) {
         res.status(500).json({
           message : "There is an error creating profile",
           error : err
         })  
       } //end of error
       res.status(201).json({
        message : `product created at ${shop.shopName} `,
            createdItem : {
                id : data._id,
                name : data.name,
                shopId : data.shop,
                category : data.category,
                image : data.image
            }
       })

        });

    })

  }, //end of create

  getAll : async(req, res, next) => {
    const alls = await Product.find({shop : req.params.shopId}).populate('shop', 'shopName shopOwner');
    res.status(200).send({
      message : "Getting all Products",
      count : alls.length,
      products : alls.map( all => {
        return {
          _id : all._id,
          name : all.name,
          price : all.price,
          shop : all.shop,
          request : {
            type : 'GET',
            url : `localhost:3000/shop/${all.shop._id}/products/${all._id}`
          }
        }
      })
    });
  },

  getById : (req, res, next) => {
    req.product.image = undefined
    return res.status(200).json(req.product)
    
      
    }, //end of get by id

    Edit : (req, res , next) => {


      let form = new formidable.IncomingForm()
      form.keepExtensions = true
      form.parse(req, (err, fields, files) => {
        if(err){
          return res.status(400).json({ error : "image could not be upoaded"});
        }
          console.log(req.product)
        // check for all fields
        const {name, desc, productType, serialCode, price, stockCount, category} = fields
        if( !name|| !desc|| !productType|| !serialCode|| !price || !stockCount || !category){
          return res.status(400).json({ error : "All fields are required"});
        }
        let product = req.product;
        product = _.extend(product, fields)
  
        if(files.image){
          console.log('FILES PHOTO :', files.image)
          // if file size is greater than 1mb == 1000000
          if (files.image.size > 1000000){
            return res.status(400).json({ error : "image should be less than 1mb "});
          }
          product.image.data = fs.readFileSync(files.image.filepath)
          product.image.contentType = files.image.mimetype
        }
  
          product.save((err, data) => {
            if(err) {
           res.status(500).json({
             message : "There is an error updating products",
             error : err
           })  
         } //end of error
         res.status(201).json({
          message : 'product updated',
              createdItem : data
         })
  
          });
  
      })
      
     
  
    },

    delete : async(req, res, next) => {
      let product = req.product
      try {
        const delprod = await product.remove()
        res.status(200).json({
          product : null,
          message : "product deleted Successfully"
                })
        
      } catch (error) {
        res.status(500).json("Product Could not be deleted");
        
      }

    }
    







}