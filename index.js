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
