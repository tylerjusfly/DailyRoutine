const express = require('express');
const router = express.Router({mergeParams : true})
const Product = require('../models/products');
const {verifyToken} = require('../controllers/verifyToken');
const {productController} = require('../controllers/products')


router.post('/', verifyToken, productController.create);

router.get('/', async(req, res, next) => {
  const alls = await Product.find()
  res.status(200).send({
    message : "Getting all Products",
    count : alls.length,
    products : alls.map( all => {
      return {
        name : all.name,
        price : all.price,
        _id : all._id,
        request : {
          type : 'GET',
          url : `localhost:3000/products/${all._id}`
        }
      }
    })
  });
});

router.get('/:productId', (req, res, next) => {
  const id = req.params.productId;
  Product.findById(id)
  .exec()
  .then(data => {
    if (data){
      res.status(200).json({
        message : "product by Id",
        data : data
      });
    }
    else{
      res.status(400).json({message : "No valid id entry for the provided id."})
    }
  })
  .catch(err => {
    console.log(err );
    res.status(500).json({
      error : err
    })
  })

});

router.patch('/:productId', async(req, res, next) => {
  try{
    const product = await Product.findById(req.params.productId)
    product.name = req.body.name
    product.price = req.body.price
    let result = await product.save();
    res.status(201).json({message : "edited version", product : {
      _id : result._id,
      name : result.name,
      price : result.price
    }})
  }
  catch(err){
    res.status(500).json({message : "There was an error Updating", error : err})
  }    
});





module.exports = router;