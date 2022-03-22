const express = require('express');
const router = express.Router();
const {userController} = require('../controllers/user')
const {VerifyToken, verifyTokenAndAuth, verifyTokenAndAdmin} = require('../controllers/verifyToken')

// edit user
router.put('/:userId', verifyTokenAndAuth, userController.edit);
// Delete User
router.delete('/:userId', verifyTokenAndAuth, userController.delete);
// Get User by Id
router.get('/:userId', verifyTokenAndAdmin, userController.getBYId);
// Get all users
router.get('/', verifyTokenAndAdmin, userController.getAll);






module.exports = router;