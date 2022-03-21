const express = require('express');
const router = express.Router();
const{shopController} = require('../controllers/shop');
const products = require('./products');
const category = require('./category');
const { verifyToken, verifyTokenAndAuth, verifyTokenAndAdmin } = require('../controllers/verifyToken');

router.post('/', verifyToken, shopController.create);
router.put('/:id', verifyToken, shopController.edit)
router.get('/', verifyToken, shopController.getByuser)
router.get('/shops', verifyTokenAndAdmin, shopController.getall)


router.use('/:shopId/products', products);
router.use('/:shopId/category', category);

module.exports = router;