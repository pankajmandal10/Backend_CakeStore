const mongoose = require("mongoose");
const ProductSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  key: {
    type: String,
  },
  price: {
    type: Number,
    require: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  image: {
    typeof: String,
  },
  rating: {
    typeof: Object,
  },
});

mongoose.model("products", ProductSchema);
mongoose.model("savedproducts", ProductSchema);
