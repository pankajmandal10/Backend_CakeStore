const express = require("express");

const router = express.Router();
const mongoose = require("mongoose");
const Products = mongoose.model("products");

router.get("/productlist", async (req, resp) => {
  const ProductList = await Products.find({}).limit(50);
  resp.send(ProductList).status(200);
});
module.exports = router;
