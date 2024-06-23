const db = require("../models");
const User = db.user;

//Create an user
async function create(req, res, next) {
  try {
    const newUser = new User({
      email: req.body.email,
      password: req.body.password,
      role: req.body.role,
    });
    await newUser
      .save()
      .then((newDoc) => {
        res.status(201).json(newDoc);
      })
      .catch((error) => {
        next(error);
      });
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
