const express = require("express");
const router = express.Router();

// Sample product data (ensure the data includes `category` and `price` for filtering/sorting)
const products = require("../data/products.json");

// GET all products
router.get("/", (req, res) => {
  res.json(products);
});

// Filter and Sort Products
router.get("/filter", (req, res) => {
  const { category, sort } = req.query;

  let filteredProducts = products;

  // Filter by category
  if (category) {
    filteredProducts = filteredProducts.filter(
      (product) => product.category === category
    );
  }

  // Sort by price
  if (sort === "asc") {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sort === "desc") {
    filteredProducts.sort((a, b) => b.price - a.price);
  }

  res.json(filteredProducts);
});

module.exports = router;
