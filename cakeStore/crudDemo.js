const express = require("express");
require("../config");
const Products = require("./product");

const app = express();
app.use(express.json());

// app.post("/create", async (req, resp) => {
//   let data = new Products(req.body);
//   let result = await data.save();
//   console.log(result);
//   resp.send(result);
// });
// app.listen(5000);

// app.get("/list", async (req, resp) => {
//   let data = await Products.find({
//     title: "Chochallaty 2 - Foldsack No. 1 Backpack, Fits 15 Laptops",
//   });
//   console.log(data);
// });

// app.delete("/delete/:id", async (req, resp) => {
//   console.log(req.params);
//   let data = await Products.deleteOne(req.params);
//   resp.send(data);
// });

// app.put("/update/:id", async (req, resp) => {
//   console.log(req.params);
//   let data = await Products.updateOne(req.params, {
//     $set: req.body,
//   });
//   resp.send(data);
//   resp.send("done");
// });

// app.get("/search/:key", async (req, resp) => {
//   console.log("pramms", req.params.key);
//   let data = await Products.find({
//     $or: [
//       { name: { $regex: req.params.key } },
//       { category: { $regex: req.params.key } },
//     ],
//   });
//   resp.send(data);
// });

// app.listen(5000);
