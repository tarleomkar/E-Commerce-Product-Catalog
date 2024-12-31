require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");

const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");
const connectDB = require("./config/db");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Static files for images
app.use("/images", express.static(path.join(__dirname, "public/images")));

// Routes
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);

// Health check route
app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK", message: "Server is running" });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal server error" });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Server setup
const PORT = process.env.PORT || 5000;

// Start server only after successful database connection
const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1); // Exit with failure
  }
};

// Graceful shutdown and unhandled rejection handling
process.on("unhandledRejection", (err) => {
  console.error("Unhandled Promise Rejection:", err);
  // Optionally, close database connections here
  process.exit(1);
});

// Start the server
startServer();
