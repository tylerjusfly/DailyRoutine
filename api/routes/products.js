const express = require('express');
const router = express.Router({mergeParams : true});
const {verifyToken, verifyTokenAndAdmin, verifyTokenAndAuth, verifyTokenAndShop} = require('../controllers/verifyToken');
const {productController} = require('../controllers/products');


router.post('/', verifyTokenAndShop, productController.create);

// Display all products for a specific shop
router.get('/', productController.getAll);

router.get('/:productId', verifyTokenAndShop, productController.getById);

// edit product from shops
router.put('/:productId', verifyTokenAndShop, productController.Edit);

router.delete('/delete/:productId', verifyTokenAndShop, productController.delete)



router.param('productId', productController.productById);

module.exports = router;