const express = require("express");
const Product = require("../models/Product");
const router = express.Router();
const productsData = require("../data/products.json");  // Importing the JSON data

// GET all products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();

    // If products are empty, populate them with data from the JSON file
    if (products.length === 0) {
      // Insert the products from the JSON file into the database (if needed)
      await Product.insertMany(productsData);
      return res.json(productsData);  // Send the JSON data as response
    }

    res.json(products);  // Send data from the database
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Filter and Sort Products
router.get("/filter", async (req, res) => {
  const { category, sort } = req.query;

  try {
    let query = {};

    // Filter by category
    if (category) {
      query.category = category;
    }

    let products = await Product.find(query);

    // Sort by price if sort is provided
    if (sort) {
      const sortOrder = sort === "asc" ? 1 : -1;
      products = await Product.find(query).sort({ price: sortOrder });
    }

    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
