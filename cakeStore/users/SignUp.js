const express = require("express");
const cors = require("cors");
const app = express();
require("../../config");
const users = require("../users/UserSchema");

app.use(express.json());
app.use(cors());
app.post("/register", async (req, resp) => {
  console.log(req.body);
  let user = new users(req.body);
  let result = await user.save();
  resp.send(result);
});
app.get("/userget", async (req, resp) => {
  let result = await users.find();
  resp.send(result);
});
app.listen(5000);
