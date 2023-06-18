const mongoose = require("mongoose");
const ProductSchema = new mongoose.Schema({
  title: {
    type: String,
    // required: true,
  },
  key: {
    type: String,
  },
  userId: {
    type: String,
  },
  qty: {
    type: Number,
  },
  price: {
    type: Number,
    // require: true,
  },
  updatedPrice: {
    type: Number,
  },
  product: {
    type: Object,
  },
  description: {
    type: String,
    // required: true,
  },
  category: {
    type: String,
    // required: true,
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
mongoose.model("orderedItem", ProductSchema);
mongoose.model("userwishlist", ProductSchema);
