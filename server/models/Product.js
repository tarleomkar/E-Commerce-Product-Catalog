// const mongoose = require("mongoose");

// const productSchema = new mongoose.Schema({
//   title: {
//     type: String,
//     required: true,
//   },
//   image: {
//     type: String,
//     required: true,
//   },
//   price: {
//     type: Number,
//     required: true,
//   },
//   category: {
//     type: String,
//     required: true,
//   },
// }, { versionKey: false }); // Disable the __v field

// const Product = mongoose.model("Product", productSchema);
// module.exports = Product;

const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Product', productSchema);
