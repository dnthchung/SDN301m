const db = require("../models");
const Role = db.role;

//Create a new role
async function create(req, res, next) {
  try {
    const newRole = new Role({
      name: req.body.name,
    });
    await newRole
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

module.exports = {
  create,
};
