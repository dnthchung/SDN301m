const jwt = require("jsonwebtoken");
const config = require("../config/auth.config");

async function verifyToken(req, res, next) {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(403).json({ message: "Token is not provided" });
    }

    const accessToken = token.split(" ")[1];
    jwt.verify(accessToken, process.env.JWT_ACCESS_KEY, (err, user) => {
      if (err) {
        return res.status(403).json({ message: "Token is not valid, must re-log in" });
      }
      req.user = user;
      next();
    });
  } catch (error) {
    next(error);
  }
}

module.exports = { verifyToken };
