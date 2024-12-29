const express = require("express");
const router = express.Router();

let cart = [];

// Add to Cart
router.post("/", (req, res) => {
  const { id, title, price, quantity = 1 } = req.body;

  const existingProduct = cart.find((item) => item.id === id);

  if (existingProduct) {
    existingProduct.quantity += quantity;
  } else {
    cart.push({ id, title, price, quantity });
  }

  res.json(cart);
});

// Get Cart Items
router.get("/", (req, res) => {
  res.json(cart);
});

// Update Quantity
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { quantity } = req.body;

  const product = cart.find((item) => item.id == id);

  if (product) {
    product.quantity = quantity;
  }

  res.json(cart);
});

// Remove Item
router.delete("/:id", (req, res) => {
  const { id } = req.params;

  cart = cart.filter((item) => item.id != id);

  res.json(cart);
});

module.exports = router;
