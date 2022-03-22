const express = require('express');
const router = express.Router();
const{shopController} = require('../controllers/shop');
const products = require('./products');
const category = require('./category');
const { verifyToken, verifyTokenAndAuth, verifyTokenAndAdmin, verifyTokenAndShop } = require('../controllers/verifyToken');

router.post('/', verifyToken, shopController.create);
// Update shop
router.put('/:shopId', verifyTokenAndShop, shopController.edit);
// get users shop
router.get('/', verifyToken, shopController.getByuser);
// Get all shops , admin Access
router.get('/shops', verifyTokenAndAdmin, shopController.getall);
// getShop by id
router.get('/:shopId', verifyTokenAndShop, shopController.getById);
// delete shop
router.delete('/:shopId', verifyTokenAndShop, shopController.delete);


router.use('/:shopId/products', products);
router.use('/:shopId/category', category);

router.param('shopId', shopController.ShopById);


module.exports = router;