const express = require("express");

const router = express.Router();
const mongoose = require("mongoose");
const User = mongoose.model("User");
const jwt = require("jsonwebtoken");
//
require("dotenv").config();
//
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");

// nodemailer
async function mailer(recieveremail, code) {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,

    secure: false, // true for 465, false for other ports
    requireTLS: true,
    auth: {
      user: "used2.codershub@gmail.com", // generated ethereal user
      pass: "wxvzhpobedwcdvjf", // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: "used2.codershub@gmail.com", // sender address
    to: `${recieveremail}`, // list of receivers
    subject: "Signup Verification", // Subject line
    text: `Your Verification Code is ${code}`, // plain text body
    html: `<b>Your Verification Code is ${code}</b>`, // html body
  });

  console.log("Message sent: %s", info.messageId);

  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}

//

router.post("/signup", async (req, res) => {
  const { name, email, password, phone, address } = req.body;
  const user = new User({
    name,
    email,
    password,
    phone,
    address,
  });
  try {
    const result = await user.save();
    console.warn("result", result);
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    res.send({ message: "User Registered Successfully", token });
  } catch (err) {
    return res.status(422).send({ error: "Invalid Credentials" });
  }
});

router.post("/verify", (req, res) => {
  console.log("sent by client - ", req.body);
  const { name, email, password, phone, address } = req.body;
  if (!name || !email || !password || !phone || !address) {
    return res.status(422).json({ error: "Please add all the fields" });
  }

  User.findOne({ email: email }).then(async (savedUser) => {
    if (savedUser) {
      return res.status(422).json({ error: "Invalid Credentials" });
    }
    try {
      let VerificationCode = Math.floor(100000 + Math.random() * 900000);
      let user = [
        {
          name,
          email,
          password,
          phone,
          address,
          VerificationCode,
        },
      ];
      await mailer(email, VerificationCode);
      res.send({
        message: "Verification Code Sent to your Email",
        udata: user,
      });
    } catch (err) {
      console.log(err);
    }
  });
});

router.put("/updateuser/:id", async (req, res) => {
  // getting id from URL param
  const { id } = req.params;
  const { address } = req.body;
  const index = await User.updateOne(
    { _id: id },
    { $set: { address: address } }
  );
  console.warn(index);
  res.send(index);
});

router.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(422).json({ error: "Please add email or password" });
  }
  const savedUser = await User.findOne({ email: email });
  // console.warn("saveUser", savedUser);
  if (!savedUser) {
    return res.status(422).json({ error: "Invalid Credentials" });
  }

  try {
    bcrypt.compare(password, savedUser.password, (err, result) => {
      if (result) {
        console.log("Password matched");
        const token = jwt.sign({ _id: savedUser._id }, process.env.JWT_SECRET);
        res.send({ token, savedUser });
      } else {
        console.log("Password does not match");
        return res.status(422).json({ error: "Invalid Credentials" });
      }
    });
  } catch (err) {
    console.log(err);
  }
});

router.get("/getloggedUser/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const data = await User.findById(id).limit(50);
    res.send(data).status(200);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
module.exports = router;
