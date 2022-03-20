const express = require('express');
const router = express.Router({mergeParams : true})
const Product = require('../models/products');
const {verifyToken, verifyTokenAndAdmin} = require('../controllers/verifyToken');
const {productController} = require('../controllers/products')


router.post('/', verifyToken, productController.create);

router.get('/', verifyTokenAndAdmin, productController.getAll);

router.get('/:productId', verifyToken, productController.getById);

router.put('/:productId', verifyToken, productController.Edit);





module.exports = router;