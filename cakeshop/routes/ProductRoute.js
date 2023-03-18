const express = require("express");

const router = express.Router();
const mongoose = require("mongoose");
const Products = mongoose.model("products");
const savedProducts = mongoose.model("savedproducts");

router.get("/productlist", async (req, resp) => {
  const ProductList = await Products.find({}).limit(50);
  resp.send(ProductList).status(200);
});

router.post("/addcartpost/:userId/:id", async (req, res) => {
  // console.warn(req.params);
  const {
    key,
    userId,
    qty = 1,
    title,
    price,
    updatedPrice,
    description,
    category,
    image,
    rating,
  } = req.body;
  // console.warn(req.body);
  let availbleData = await savedProducts.find({
    key: req.params.id,
    userId: req.params.userId,
  });
  console.warn("try", availbleData, availbleData != null);
  if (availbleData.length !== 0) {
    await savedProducts.updateOne(
      { key },
      {
        $set: {
          updatedPrice: availbleData[0].updatedPrice + price,
          qty: updatedData[0].qty + 1,
        },
      }
    );
    res.send("Successfully Update");
  } else {
    const cart = new savedProducts({
      key,
      userId,
      qty,
      title,
      price,
      updatedPrice,
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

router.get("/getaddetocartdata/:userId", async (req, resp) => {
  const addedProductList = await savedProducts
    .find({ userId: req.params.userId })
    .limit(50);
  resp.send(addedProductList).status(200);
});

router.put("/updatequantity/increment/:productId/:userId", async (req, res) => {
  const { key, qty = 1, price } = req.body;
  console.warn(req.body);
  const updatedData = await savedProducts.find({
    key: req.params.productId,
    userId: req.params.userId,
  });
  console.warn(updatedData);
  await savedProducts.updateOne(
    { key },
    {
      $set: {
        updatedPrice: updatedData[0].updatedPrice + price,
        qty: updatedData[0].qty + 1,
      },
    }
  );
  res.send("Successfully Inc Qty Update");
});

router.put("/updatequantity/decrement/:productId/:userId", async (req, res) => {
  const { key, qty = 1, price } = req.body;
  console.warn(req.body);
  const updatedData = await savedProducts.find({
    key: req.params.productId,
    userId: req.params.userId,
  });
  console.warn(updatedData);
  await savedProducts.updateOne(
    { key },
    {
      $set: {
        updatedPrice: updatedData[0].updatedPrice - price,
        qty: updatedData[0].qty - 1,
      },
    }
  );
  res.send("Successfully Dec Qty Update");
});
