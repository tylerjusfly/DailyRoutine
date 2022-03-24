const express = require('express');
const router = express.Router({mergeParams : true})
const {verifyToken, verifyTokenAndShop} = require('../controllers/verifyToken');
const {couponController} = require('../controllers/coupon');

router.post('/', verifyTokenAndShop, couponController.create);
router.delete('/:couponId', verifyTokenAndShop, couponController.delete);
router.get('/', verifyTokenAndShop, couponController.getall);





router.param('couponId', couponController.couponById);

module.exports = router;