const express = require('express');
const router = express.Router({mergeParams : true})
const {verifyToken, verifyTokenAndShop} = require('../controllers/verifyToken');
const {CategoryController} = require('../controllers/category');

router.post('/create', verifyTokenAndShop, CategoryController.create)
router.get('/:catId', CategoryController.getById)
router.put('/:catId', CategoryController.edit);
router.delete('/:catId', CategoryController.remove);
// Get all categories
router.get('/', CategoryController.getall);




router.param('catId', CategoryController.categoryById);

module.exports = router;