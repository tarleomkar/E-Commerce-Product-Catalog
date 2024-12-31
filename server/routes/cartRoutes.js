const express = require("express");
const {
  addToCart,
  getCartItems,
  updateCartItemQuantity,
  removeCartItem,
} = require("../controllers/cartController");

const router = express.Router();

router.post("/", addToCart);
router.get("/", getCartItems);
router.put("/:id", updateCartItemQuantity);
router.delete("/:id", removeCartItem);

module.exports = router;
