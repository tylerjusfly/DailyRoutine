const express = require('express');
const router = express.Router({mergeParams : true})
const {orderController} = require('../controllers/order');

router.post('/', orderController.create);



module.exports = router;