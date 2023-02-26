const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
  title: String,
  price: Number,
  category: String,
  rating: Object,
  description: String,
  image: String,
});

module.exports = mongoose.model("products", productSchema);
