const express = require("express");
const cors = require("cors");
const productRoutes = require("./routes/products");
const cartRoutes = require("./routes/cart");
const connectDB = require("./config/db");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(express.json());
app.use('/public', express.static('public'));
connectDB();


app.get("/", (req, res) => {
  res.send("Server is running");
})

// Routes  
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);


// Server setup
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
