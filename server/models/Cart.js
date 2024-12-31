// const mongoose = require("mongoose");

// const CartSchema = new mongoose.Schema({
//   productId: { type: String, required: true },
//   title: { type: String, required: true },
//   price: { type: Number, required: true },
//   quantity: { type: Number, default: 1 },
//   userId: { type: String, required: true },  // Ensuring each cart is user-specific
// });

// module.exports = mongoose.model("Cart", CartSchema);

const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  userId: {
    type: String, // or mongoose.Schema.Types.ObjectId if linked to a User model
    required: true,
  },
  items: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        default: 1,
      },
    },
  ],
});

module.exports = mongoose.model('Cart', cartSchema);

