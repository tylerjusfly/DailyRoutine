const express = require('express');
const router = express.Router({mergeParams : true})
const {verifyToken} = require('../controllers/verifyToken');
const {CategoryController} = require('../controllers/category');

router.post('/create', verifyToken, CategoryController.create)






module.exports = router;