const db = require("../models");
const User = db.user;

//Create an user
async function create(req, res, next) {
  try {
    const newUser = new User({
      email: req.body.email,
      password: req.body.password,
      type: req.body.type,
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

//Update an user

//Delete an user

module.exports = {
  create,
};
