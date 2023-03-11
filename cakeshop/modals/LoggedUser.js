const mongoose = require("mongoose");
const LoggeduserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    require: true,
  },
  address: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("loggeduser", LoggeduserSchema);
