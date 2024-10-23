const bodyParser = require("body-parser");
const express = require("express");

// ========== / controller /==========
const db = require("../models");
// const User = db.user;
const bcrypt = require("bcrypt");

//sign up
async function register(req, res, next) {
  try {
    if (req.body) {
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(req.body.password, salt);

      const emailInput = req.body.email;
      //check email exist
      const userExist = await User.findOne({
        email: emailInput,
      });
      if (userExist) {
        return res.status(400).json({
          status: 400,
          message: "Email đã được đăng ký !!",
        });
      }

      const newUser = new User({
        fullName: req.body.fullName,
        role: "user",
        email: req.body.email,
        password: hashPassword,
      });

      const saveUser = await newUser.save();

      res.status(201).json({
        message: "User created successfully",
        data: saveUser,
      });
    }
  } catch (err) {
    next(err);
  }
}

// ========== / routes /==========
const exRouter = express.Router();
exRouter.use(bodyParser.json());

exRouter.post("/register", register);

module.exports = exRouter;
