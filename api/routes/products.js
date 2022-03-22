const express = require('express');
const router = express.Router({mergeParams : true})
const {verifyToken, verifyTokenAndAdmin, verifyTokenAndAuth, verifyTokenAndShop} = require('../controllers/verifyToken');
const {productController} = require('../controllers/products')


router.post('/', verifyTokenAndShop, productController.create);

router.get('/', verifyTokenAndAdmin, productController.getAll);

router.get('/:productId', verifyTokenAndShop, productController.getById);

// edit product from shops
router.put('/:productId', verifyToken, productController.Edit);

router.delete('/del/:productId', verifyToken, verifyTokenAndAuth, productController.delete)



router.param('productId', productController.productById);

module.exports = router;