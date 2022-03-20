const express = require('express');
const router = express.Router();
const {authController} = require('../controllers/auth')


router.post('/signup', authController.create);
router.post('/signin', authController.Login);



module.exports = router;