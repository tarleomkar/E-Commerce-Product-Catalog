const express = require("express");
const cors = require("cors");
const productRoutes = require("./routes/products");
const cartRoutes = require("./routes/cart");
const path = require("path");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Static files for images
// app.use("/images", express.static(path.join(__dirname, "public", "images")));
app.use('/images', express.static(path.join(__dirname, 'public', 'images')));

// Routes
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);

// Root Route
app.get("/", (req, res) => {
  res.send("Welcome to the E-Commerce API");
});

// Server setup
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
