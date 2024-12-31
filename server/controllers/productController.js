const Product = require("../models/Product");
const productsData = require("../data/products.json"); // JSON data for populating products

// Get all products
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();

    if (products.length === 0) {
      await Product.insertMany(productsData);
      return res.json(productsData);
    }

    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Filter and sort products
const filterAndSortProducts = async (req, res) => {
  const { category, sort } = req.query;

  try {
    let query = {};

    if (category) {
      query.category = category;
    }

    let products = await Product.find(query);

    if (sort) {
      const sortOrder = sort === "asc" ? 1 : -1;
      products = await Product.find(query).sort({ price: sortOrder });
    }

    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getAllProducts,
  filterAndSortProducts,
};
