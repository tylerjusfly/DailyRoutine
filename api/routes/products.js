const express = require('express');
const router = express.Router({mergeParams : true})
const Product = require('../models/products');
const {verifyToken, verifyTokenAndAdmin} = require('../controllers/verifyToken');
const {productController} = require('../controllers/products')


router.post('/', verifyToken, productController.create);

router.get('/', verifyTokenAndAdmin, productController.getAll);

router.get('/:productId', verifyToken, productController.getById);

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