const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  productId: { type: Number, required: true },
  title: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, default: 1 },
});

module.exports = mongoose.model("Cart", cartSchema);
