const mongoose = require("mongoose");
require("dotenv").config();
mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.mongo_URL, { useNewUrlParser: true })
  .then(() => {
    console.log("connected to database");
  })
  .catch((err) => {
    console.log(`Could not connect to db ` + err);
  });
