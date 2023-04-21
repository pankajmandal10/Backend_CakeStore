const express = require("express");

const router = express.Router();
const mongoose = require("mongoose");
const Products = mongoose.model("products");
const savedProducts = mongoose.model("savedproducts");

router.get("/productlist", async (req, resp) => {
  try {
    const ProductList = await Products.find({}).limit(50);
    resp.json(ProductList);
  } catch (err) {
    resp.sendStatus(500);
  }
});

router.post("/addcartpost/:userId/:id", async (req, res) => {
  // console.warn(req.params);
  const { key, userId, qty = 1, updatedPrice, product } = req.body;
  console.warn(req.body);
  let availbleData = await savedProducts.find({
    key: req.params.id,
    userId: req.params.userId,
  });
  console.warn("try", availbleData);
  if (availbleData.length !== 0) {
    await savedProducts.updateOne(
      { key },
      {
        $set: {
          updatedPrice: availbleData[0].updatedPrice + product.price,
          qty: availbleData[0].qty + 1,
        },
      }
    );
    res.send("Successfully Update");
  } else {
    const cart = new savedProducts({
      key,
      userId,
      qty,
      updatedPrice,
      product,
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
  const query = { key: req.params.productId, userId: req.params.userId };
  const updatedData = await savedProducts.find(query);
  const update = {
    $set: {
      updatedPrice: updatedData[0].updatedPrice + price,
      qty: updatedData[0].qty + 1,
    },
  };
  savedProducts.updateOne(query, update, function (err, result) {
    if (err) {
      res.status(500).send("Error updating document");
      return;
    }
    console.log("1 document updated");
    res.status(200).send("Updated Quntity").end();
  });
});

router.put("/updatequantity/decrement/:productId/:userId", async (req, res) => {
  const { key, qty = 1, price } = req.body;
  const query = { key: req.params.productId, userId: req.params.userId };
  const updatedData = await savedProducts.find({
    key: req.params.productId,
    userId: req.params.userId,
  });
  const update = {
    $set: {
      updatedPrice: updatedData[0].updatedPrice - price,
      qty: updatedData[0].qty - 1,
    },
  };
  savedProducts.updateOne(query, update, function (err, result) {
    if (err) {
      res.status(500).send("Error updating document");
      return;
    }
    res.status(200).send("Deleted item").end();
  });
});

// product search api
router.get("/api/productSearch", async (req, res) => {
  const name = req.query.name;
  console.warn("name", name);
  // const query = { title: { $regex: name, $options: "i" } };
  const query = req.query.name
    ? { title: { $regex: name, $options: "i" } }
    : {};
  console.warn("query", query);
  try {
    const products = await Products.find(query);
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

// Product Search By Category
router.get("/api/productSearchByCategory", async (req, res) => {
  const name = req.query.category;
  console.warn("name", name);
  // const query = { title: { $regex: name, $options: "i" } };
  const query = req.query.category
    ? { category: { $regex: name, $options: "i" } }
    : {};
  console.warn("query", query);
  try {
    const products = await Products.find(query);
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

router.delete("/deleteproduct/:userId/:productId", async (req, res) => {
  const query = { key: req.params.productId, userId: req.params.userId };
  await savedProducts.deleteOne(query);
  res.send("Product Deleted Succesfully");
});
