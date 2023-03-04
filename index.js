const express = require("express");
const port = 3000;

const app = express();
const bodyParser = require("body-parser");
//
require("./db");
require("./cakeshop/modals/User");
require("./cakeshop/modals/Product");
//
const authRoutes = require("./cakeshop/routes/authRoutes");
const ProductRoute = require("./cakeshop/routes/ProductRoute");
const requireToken = require("./cakeshop/middleware/AuthTokenRequired");
//
app.use(bodyParser.json());
app.use(authRoutes);
app.use(ProductRoute);
//

app.get("/", requireToken, (req, res) => {
  console.log("fff", req.user);
  res.send(req.user);
});

// app.get("/productlist", (req, res) => {
//   console.warn("kya h", req);
//   res.send(res.products);
// });

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
