const express = require('express');
const router = express.Router({mergeParams : true})
const {orderController} = require('../controllers/order');

router.post('/', orderController.create);

router.post('/pay/:orderId')


router.param('orderId', orderController.orderById);

module.exports = router;