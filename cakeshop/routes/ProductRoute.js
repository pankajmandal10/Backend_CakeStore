const express = require("express");

const router = express.Router();
const mongoose = require("mongoose");
const Products = mongoose.model("products");
const savedProducts = mongoose.model("savedproducts");

router.get("/productlist", async (req, resp) => {
  const ProductList = await Products.find({}).limit(50);
  resp.send(ProductList).status(200);
});

router.post("/api/v1/addcartpost/:id", async (req, res) => {
  const { key, title, price, description, category, image, rating } = req.body;
  console.warn(req.body);
  console.warn(req.params.id);
  let availbleData = await savedProducts.findOne({ key: req.params.id });
  console.warn("try", availbleData);
  if (availbleData != null) {
    await savedProducts.updateOne(
      { key },
      { $set: { price: availbleData.price + price } }
    );
    res.send("Successfully Update");
  } else {
    const cart = new savedProducts({
      key,
      title,
      price,
      description,
      category,
      image,
      rating,
    });
    try {
      await cart.save();
      res.send({ message: "Added Successfully" });
    } catch (error) {
      return res.status(422).send({ error: "Invalid" });
    }
  }
});
module.exports = router;
