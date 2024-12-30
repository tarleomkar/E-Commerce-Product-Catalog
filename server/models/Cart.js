const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema({
  productId: { type: String, required: true },
  title: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, default: 1 },
  userId: { type: String, required: true },  // Ensuring each cart is user-specific
});

module.exports = mongoose.model("Cart", CartSchema);
