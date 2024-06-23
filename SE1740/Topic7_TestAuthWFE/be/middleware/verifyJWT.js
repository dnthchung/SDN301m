//kiểm soát access token, trước khi đến controller
const jwt = require("jsonwebtoken");

async function verifyToken(req, res, next) {
  //get token from header of user
  const token = req.headers.token;
  if (token) {
    const secretToken = token.split(" ")[1];
    //   console.log(secretToken);
    jwt.verify(secretToken, process.env.JWT_ACCESS_KEY, (err, user) => {
      if (err) {
        //forbidden - ngăn cấm
        return res.status(403).json("Token is not valid or expired.");
      }
      req.user = user;
      next();
    });
  } else {
    return res.status(401).json("You are not authorized");
  }
}

//just admin and its user can access
async function verifyTokenIsUserAndAdmin(req, res, next) {
  verifyToken(req, res, () => {
    if (req.user.id == req.params.id || req.user.roles) {
      next();
    } else {
      return res.status(403).json("You are not allowed to do that. Must be admin or do it with your correct id.");
    }
  });
}

//just admin can access
async function verifyTokenIsAdmin(req, res, next) {
  verifyToken(req, res, () => {
    console.log(req.user);

    if (req.user.role.name === "admin") {
      next();
    } else {
      return res.status(403).json("You are not allowed to do that. Must be admin.");
    }
  });
}

module.exports = {
  verifyToken,
  verifyTokenIsUserAndAdmin,
  verifyTokenIsAdmin,
};
