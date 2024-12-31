const Cart = require("../models/Cart");

// Add product to cart
const addToCart = async (req, res) => {
  const { productId, title, price, quantity = 1, userId } = req.body;

  try {
    let cartItem = await Cart.findOne({ productId, userId });

    if (cartItem) {
      cartItem.quantity += quantity;
      await cartItem.save();
      return res.json(cartItem);
    } else {
      cartItem = new Cart({ productId, title, price, quantity, userId });
      await cartItem.save();
      return res.json(cartItem);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all items in the cart for a specific user
const getCartItems = async (req, res) => {
  const { userId } = req.query;

  try {
    const cartItems = await Cart.find({ userId });
    return res.json(cartItems);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Update quantity of a cart item
const updateCartItemQuantity = async (req, res) => {
  const { quantity } = req.body;

  try {
    let cartItem = await Cart.findById(req.params.id);

    if (cartItem) {
      cartItem.quantity = quantity;
      await cartItem.save();
      return res.json(cartItem);
    } else {
      return res.status(404).json({ message: "Item not found in cart" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Remove item from the cart
const removeCartItem = async (req, res) => {
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
};

module.exports = {
  addToCart,
  getCartItems,
  updateCartItemQuantity,
  removeCartItem,
};
