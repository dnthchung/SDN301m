const db = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const config = require("../config/auth.config");

//gọi ra các đối tượng từ db
const User = db.user;
const Role = db.role;

function generateAccessToken(user) {
  return jwt.sign(
    {
      id: user.id,
      userName: user.userName,
      email: user.email,
    },
    process.env.JWT_ACCESS_KEY,
    {
      expiresIn: "30s",
    },
  );
}

async function signup(req, res, next) {
  try {
    if (req.body) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);

      const newUser = new User({
        userName: req.body.userName,
        email: req.body.email,
        password: hashedPassword,
      });

      await newUser.save();
      res.status(201).json({ message: "User was registered successfully!", user: newUser });
    }
  } catch (error) {
    next(error);
  }
}

// Sign in action
async function signin(req, res, next) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).exec();
    if (!user) return res.status(404).json({ message: "User not found" });

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(401).json({ message: "Wrong password" });

    const accessToken = generateAccessToken(user);

    res.status(200).json({
      message: "Logged in successfully",
      accessToken,
      user: {
        id: user._id,
        userName: user.userName,
        email: user.email,
      },
    });
  } catch (error) {
    next(error);
  }
}
module.exports = {
  signup,
  signin,
};
