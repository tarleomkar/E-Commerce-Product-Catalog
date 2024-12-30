const express = require("express");
const router = express.Router();
const Cart = require("../models/Cart");

// Add product to cart
router.post("/", async (req, res) => {
  const { productId, title, price, quantity = 1, userId } = req.body;

  try {
    // Check if the product already exists in the cart for the user
    let cartItem = await Cart.findOne({ productId, userId });

    if (cartItem) {
      // If product exists, update the quantity
      cartItem.quantity += quantity;
      await cartItem.save();
      return res.json(cartItem);  // Return updated cart item
    } else {
      // If product doesn't exist, create a new cart item
      cartItem = new Cart({ productId, title, price, quantity, userId });
      await cartItem.save();
      return res.json(cartItem);  // Return new cart item
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Get all items in the cart for a specific user
// Get all items in the cart for a specific user
router.get("/", async (req, res) => {
  const { userId } = req.query;  // Get userId from query params
  try {
    const cartItems = await Cart.find({ userId });
    return res.json(cartItems);  // Return the user's cart items
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});


// Update quantity of a cart item
// Update quantity of a cart item
router.put("/:id", async (req, res) => {
  const { quantity } = req.body;
  try {
    let cartItem = await Cart.findById(req.params.id);
    if (cartItem) {
      cartItem.quantity = quantity;
      await cartItem.save();
      return res.json(cartItem); // Return updated cart item
    } else {
      return res.status(404).json({ message: "Item not found in cart" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});


// Remove item from the cart
router.delete("/:id", async (req, res) => {
  try {
    const cartItem = await Cart.findByIdAndDelete(req.params.id);

    if (cartItem) {
      return res.json({ message: "Item removed from cart" });
    } else {
      return res.status(404).json({ message: "Item not found in cart" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
