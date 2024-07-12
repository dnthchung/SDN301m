const createHttpError = require("http-errors");
const db = require("../models");
const { create } = require("../models/role.model");
const User = db.user;
const Role = db.role;
const ROLES = db.ROLES;

async function checkExistUser(req, res, next) {
  try {
    //kiểm soát trước khi đưa xung model
    if (!req.body.email || !req.body.password || !req.body.type) {
      throw createHttpError.BadRequest("Missing email, password or type");
    }
    if (await User.findOne({ email: req.body.email })) {
      throw createHttpError.BadRequest(`${req.body.email} is already registered`);
    }
    next();
  } catch (error) {
    next(error);
  }
}

async function checkExistRole(req, res, next) {
  try {
    if (req.body.roles) {
      const roles = await Role.find({ name: { $in: req.body.roles } }).exec();
      if (roles.length !== req.body.roles.length) {
        throw createHttpError.BadRequest("Role not found");
      }
    }
    next();
  } catch (error) {
    next(error);
  }
}

module.exports = {
  checkExistUser,
  checkExistRole,
};
