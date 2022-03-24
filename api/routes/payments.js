const express = require("express");
const router = express.Router();
const Order = require("../models/order");
const { PaymentController } = require("../controllers/payments");
const {
  verifyToken,
  verifyTokenAndAuth,
} = require("../controllers/verifyToken");

router.post("/", PaymentController.makePayment);

module.exports = router;
