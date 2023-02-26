// const cors = require("cors");
// const express = require("express");
// const app = express();
// require("./config");
// const Products = require("./cakeStore/product");
// app.use(express.json());
// app.use(cors());
// app.get("/list", async (req, resp) => {
//   let data = await Products.find();
//   resp.send(data);
//   console.log(data);
// });
// app.post("/create", async (req, resp) => {
//   let data = new Products(req.body);
//   let result = await data.save();
//   console.log(result);
//   resp.send(result);
// });
// app.listen(5000);
// // const dataControl = (requ, resp) => {
// //   resp.write("somethimg here drgg dsgasfg");
// //   resp.end();
// // };
// // http.createServer(dataControl).listen(4000);

const express = require("express");
const port = 3000;

const app = express();
const bodyParser = require("body-parser");
//
require("./db");
require("./cakeshop/modals/User");
//
const authRoutes = require("./cakeshop/routes/authRoutes");
const requireToken = require("./cakeshop/middleware/AuthTokenRequired");
//
app.use(bodyParser.json());
app.use(authRoutes);
//

app.get("/", requireToken, (req, res) => {
  console.log("fff", req.user);
  res.send(req.user);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
