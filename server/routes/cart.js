const express = require("express");
const router = express.Router();
const Cart = require("../models/Cart");

// Add product to cart
router.post("/", async (req, res) => {
  const { productId, title, price, quantity = 1 } = req.body;

  try {
    // Check if the product already exists in the cart
    let cartItem = await Cart.findOne({ productId });

    if (cartItem) {
      // If product exists, update the quantity
      cartItem.quantity += quantity;
      await cartItem.save();
    } else {
      // If product doesn't exist, create a new cart item
      cartItem = new Cart({ productId, title, price, quantity });
      await cartItem.save();
    }

    res.json(cartItem);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Get all items in the cart
router.get("/", async (req, res) => {
  try {
    const cartItems = await Cart.find();
    res.json(cartItems);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Update quantity of a cart item
router.put("/:id", async (req, res) => {
  const { quantity } = req.body;

  try {
    let cartItem = await Cart.findById(req.params.id);

    if (cartItem) {
      cartItem.quantity = quantity;
      await cartItem.save();
      res.json(cartItem);
    } else {
      res.status(404).json({ message: "Item not found in cart" });
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
      res.json({ message: "Item removed from cart" });
    } else {
      res.status(404).json({ message: "Item not found in cart" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
