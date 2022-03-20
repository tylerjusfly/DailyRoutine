const express = require('express');
const router = express.Router();
const {userController} = require('../controllers/user')
const {VerifyToken, verifyTokenAndAuth, verifyTokenAndAdmin} = require('../controllers/verifyToken')

// edit user
router.put('/:id', verifyTokenAndAuth, userController.edit);
// Delete User
router.delete('/:id', verifyTokenAndAuth, userController.delete);
// Get User by Id
router.get('/:id', verifyTokenAndAdmin, userController.getBYId);
// Get all users
router.get('/', verifyTokenAndAdmin, userController.getAll);






module.exports = router;