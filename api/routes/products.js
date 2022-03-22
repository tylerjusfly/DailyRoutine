const express = require('express');
const router = express.Router({mergeParams : true})
const {verifyToken, verifyTokenAndAdmin, verifyTokenAndAuth} = require('../controllers/verifyToken');
const {productController} = require('../controllers/products')


router.post('/', verifyToken, productController.create);

router.get('/', verifyTokenAndAdmin, productController.getAll);

router.get('/:productId', verifyToken, productController.getById);

router.put('/:productId', verifyToken, productController.Edit);

router.delete('/del/:productId', verifyToken, verifyTokenAndAuth, productController.delete)



router.param('productId', productController.productById);

module.exports = router;