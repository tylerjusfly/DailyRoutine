const Product = require('../models/products');
const Shop = require('../models/shop');
const formidable = require('formidable');
const fs = require('fs')
const _ = require('lodash');

exports.productController = {
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
    const alls = await Product.find();
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

  getById : async(req, res, next) => {
    const id = req.params.productId;
    const product = await Product.findById(id).populate('shop', 'shopName')
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
      
    }, //end of get by id

    Edit : async(req, res , next) => {
      
      try{
        const updatedprod = await Product.findByIdAndUpdate(req.params.productId, {
          $set : req.body
        }, {new : true});
        res.status(200).json(updatedprod);
      }
      catch(err){
        console.log(err);
        res.status(500).json(err);
      }
  
  
    },
    







}