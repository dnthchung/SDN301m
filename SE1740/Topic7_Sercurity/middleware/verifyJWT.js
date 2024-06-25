//kiểm soát access token, trước khi đến controller

const createHttpError = require("http-errors");
const config = require("../config/auth.config");
const jwt = require("jsonwebtoken");
const db = require("../models");
const { user: User, role: Role } = db;

async function verifyToken(req, res, next) {
  try {
    const requestToken = req.headers["x-access-token"];
    if (!requestToken) throw createHttpError(403, "No token provided!");

    jwt.verify(requestToken, config.secret, async (err, decoded) => {
      if (err) {
        const message = err instanceof jwt.TokenExpiredError ? "Token Expired!" : err.message;
        throw createHttpError.Forbidden(message);
      }
      req.userId = decoded.id;

      next();
    });

    throw createHttpError.Unauthorized("Invalid Token!");
  } catch (error) {
    next(error);
  }
}

async function isModerator(req, res, next) {
  try {
    const existUser = await User.findById(req.userId).exec();
    if (!existUser) throw createHttpError(404, "User Not found!");

    const roles = await Role.find({ _id: { $in: existUser.roles } }).exec();
    if (!roles) throw createHttpError.Forbidden("Require Moderator Role!");

    for (let i = 0; i < roles.length; i++) {
      if (roles[i].name === "moderator") {
        next();
        return;
      }
    }
    throw createHttpError.Forbidden("Require Moderator Role!");
  } catch (error) {
    next(error);
  }
}

const verifyJWT = {
  verifyToken,
  isModerator,
};
module.exports = verifyJWT;
