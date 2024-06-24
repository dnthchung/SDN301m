const db = require("../models");
const bcrypt = require("bcrypt");
const User = db.user;
const Role = db.role;

//Create an user - role admin : create admin / seller
async function create(req, res, next) {
  try {
    if (req.body) {
      // Hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);

      // Create new user object
      const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword,
      });

      // Assign role based on input from frontend
      if (req.body.role) {
        const roleFound = req.body.role;
        const roleFoundInDB = await Role.findOne({ name: roleFound }).exec();
        newUser.role = roleFoundInDB._id;
      } else {
        // Default role : seller
        const defaultRole = await Role.findOne({ name: "seller" }).exec();
        newUser.role = defaultRole._id;
      }

      // Save the new user
      await newUser.save();
      res.status(201).json({
        message: "User was registered successfully!",
        user: newUser,
      });
    }
  } catch (error) {
    next(error);
  }
}

//Get all users
async function getAll(req, res, next) {
  try {
    const users = await User.find().exec();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
}

//Update an user

//Delete an user

module.exports = {
  create,
  getAll,
};
