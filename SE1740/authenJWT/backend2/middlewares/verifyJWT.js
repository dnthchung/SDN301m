const jwt = require("jsonwebtoken");

const verifyJWT = {
  //verify token
  verifyToken: (req, res, next) => {
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
  },

  //verify token and admin role -  chỉ để thao tác với những thứ thộc về mình, và admin có thể thao tác với tất cả
  //ví dụ chỉ mình or admin mới xóa dc tk của mình thông qua so sánh id nhận được từ token và id truyền vào

  verifyTokenAndAdmin: (req, res, next) => {
    verifyJWT.verifyToken(req, res, () => {
      if (req.user.id == req.params.id || req.user.admin) {
        next();
      } else {
        return res.status(403).json("You are not allowed to do that. Must be admin or do it with your correct id.");
      }
    });
  },
};

module.exports = verifyJWT;
