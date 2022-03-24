const mongoose = require("mongoose");

const PaymentSchema = mongoose.Schema({
  paymentId: { type: String, required: true },
  payerId: { type: Number, required: true },
  orderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Order",
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("Payment", PaymentSchema);
