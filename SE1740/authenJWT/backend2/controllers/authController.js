const bcrypt = require("bcrypt");
const User = require("../models/userModel"); // Ensure correct path
const jwt = require("jsonwebtoken");

//store refresh token, nếu nhận vào 1 refresh token mới thì sẽ so sảnh xem ci nhận vào có ở trong này ko
//tránh ly của thằng khác xong nhập vào, bình thường thì sử dụng redis để lưu trữ refresh token
//redis: lưu trữ dữ liệu trong bộ nhớ, nhanh hơn db, dùng để lưu trữ session, token, cache
//nguyên nhân cần refresh token: access token hết hạn, không cần phải đăng nhập lại, chỉ cần refresh token -> tránh làm phiền người dùng, bắt họ đăng nhập đi đăng nhâp lại
//quy trình : login -> có access token và refresh token -> access token hết hạn -> dùng refresh token(/refresh) để lấy access token mới
let refreshTokens = [];
const authController = {
  //generate access token
  generateAccessToken: (user) => {
    return jwt.sign(
      {
        id: user.id,
        admin: user.admin,
      },
      process.env.JWT_ACCESS_KEY,
      { expiresIn: "30s" },
    );
  },
  //generate refresh token
  generateRefreshToken: (user) => {
    return jwt.sign(
      {
        id: user.id,
        admin: user.admin,
      },
      process.env.JWT_REFRESH_KEY,
      { expiresIn: "1d" },
    );
  },

  register: async (req, res) => {
    try {
      // Hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);

      // Create new user
      const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword,
      });

      // Save to DB
      const user = await newUser.save();
      return res.status(201).json(user);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  loginUser: async (req, res) => {
    try {
      // Find user
      const userFound = await User.findOne({ username: req.body.username });
      if (!userFound) return res.status(400).json({ message: "User not found." });
      const validPassword = await bcrypt.compare(req.body.password, userFound.password);
      if (!validPassword) return res.status(400).json({ message: "Wrong password" });

      if (validPassword && validPassword) {
        // Create and assign a token token ết hạn là bắt log in lại, đa số là 2h là hết hạn
        const accessToken = authController.generateAccessToken(userFound);
        const refreshToken = authController.generateRefreshToken(userFound);
        refreshTokens.push(refreshToken);
        res.cookie("refreshToken", refreshToken, {
          httpOnly: true,
          secure: false, // true: chỉ gửi cookie qua https(deploy), false: gửi qua http(run local)
          path: "/",
          sameSite: "strict",
        });
        //lôi password ra khỏi userFound không muốn trả về, nguy him vl
        //đã save refresh token vào cookie -> k cần trả về client nữa
        const { password, ...others } = userFound._doc;
        return res.status(200).json({ ...others, accessToken, message: "Login successful" });
      }
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },

  //refresh token
  requestRefreshToken: async (req, res) => {
    try {
      //take refresh token from cookie from user
      const refreshToken = req.cookies.refreshToken;
      if (!refreshToken) return res.status(403).json("User not logged in, not authenticated.");
      if (!refreshTokens.includes(refreshToken)) return res.status(403).json("Refresh token is not valid.");

      jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY, (err, user) => {
        if (err) return res.status(403).json("User not logged in + error: " + err.message);
        //filter refresh token ra, lọc nó ra, vì khi có token mới rồi thì cần lọc cái cũ ra
        refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
        //generate new access token
        const newAccessToken = authController.generateAccessToken(user);
        const newRefreshToken = authController.generateRefreshToken(user);
        refreshTokens.push(newRefreshToken);
        res.cookie("refreshToken", newRefreshToken, {
          httpOnly: true,
          secure: false,
          path: "/",
          sameSite: "strict",
        });

        return res.status(200).json({ accessToken: newAccessToken });
      });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },

  //logout
  logoutUser: async (req, res) => {
    try {
      //take refresh token from cookie from user
      res.clearCookie("refreshToken");
      //clear access token thì ần qua client vì ý tưởng là luuw trữ trong redux store(client -FE)
      //còn đây là đang luuw trữ trong 1 mảng -> reset cái mảng này lại
      refreshTokens = refreshTokens.filter((token) => token !== req.cookies.refreshToken);
      return res.status(200).json("Logout successful");
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
};

module.exports = authController;
