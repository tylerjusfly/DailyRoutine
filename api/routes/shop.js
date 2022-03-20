const express = require('express');
const router = express.Router();
const{shopController} = require('../controllers/shop');
const products = require('./products')
const { verifyToken, verifyTokenAndAuth, verifyTokenAndShopOwner, verifyTokenAndAdmin } = require('../controllers/verifyToken');

router.post('/', verifyToken, shopController.create);
router.put('/:id', verifyToken, shopController.edit)
router.get('/', verifyToken, shopController.getByuser)
router.get('/shops', verifyTokenAndAdmin, shopController.getall)


router.use('/:shopId/products', products);

module.exports = router;