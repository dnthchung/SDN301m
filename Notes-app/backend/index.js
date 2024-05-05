require("dotenv").config();

const config = require("./config.json");
const mongoose = require("mongoose");

mongoose.connect(config.connectionString);

//Api Create account step 2
const User = require("./models/user.model");

const express = require("express");
const cors = require("cors");
const app = express();

const jwt = require("jsonwebtoken");
const { authenticateToken } = require("./utilities");

app.use(express.json());

app.use(
  cors({
    origin: "*", // restrict calls to those this address
  })
);

app.get("/", (req, res) => {
  res.json({ message: "Hello World" });
});

//Api Create account step 1 :
app.post("/create-account", async (req, res) => {
  const { fullName, email, password } = req.body;

  if (!fullName) {
    return res
      .status(400)
      .json({ error: true, message: "Full name is required" });
  }

  if (!email) {
    return res.status(400).json({ error: true, message: "Email is required" });
  }

  if (!password) {
    return res
      .status(400)
      .json({ error: true, message: "Password is required" });
  }

  //check if email already exists
  const isUserExists = await User.findOne({ email });
  if (isUserExists) {
    return res
      .status(400)
      .json({ error: true, message: "Email(User) already exists" });
  }

  const user = new User({
    fullName,
    email,
    password,
  });
  await user.save();

  const accessToken = jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "36000m",
  });

  return res.json({
    error: false,
    user,
    accessToken,
    message: "Account created successfully",
  });
});

//Api Login step 1 :
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email) {
    return res.status(400).json({ error: true, message: "Email is required" });
  }

  if (!password) {
    return res
      .status(400)
      .json({ error: true, message: "Password is required" });
  }

  // const userInfo = await User.findOne({ email: email, password: password });
  const userInfo = await User.findOne({ email: email });

  if (!userInfo) {
    return res.status(400).json({ error: true, message: "User not found!" });
  }

  if (userInfo.email == email || userInfo.password == password) {
    const user = { user: userInfo };
    const accessToken = jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "36000m",
    });

    return res.json({
      error: false,
      email,
      accessToken,
      message: "Login successful",
    });
  } else {
    return res
      .status(400)
      .json({ error: true, message: "Invalid email or password" });
  }
});

app.listen(8000);

module.exports = app;
