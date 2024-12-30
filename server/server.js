const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const productRoutes = require("./routes/products");
const cartRoutes = require("./routes/cart");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);

// MongoDB Atlas connection
mongoose
  .connect("mongodb://localhost:27017/ecommerce")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB connection error:", err));

// Server setup
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
