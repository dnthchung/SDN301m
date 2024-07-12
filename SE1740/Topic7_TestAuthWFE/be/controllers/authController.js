const db = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//gọi ra các đối tượng từ db
const User = db.user;
const Role = db.role;

//generate access token : chứa thông tin user trả về, muốn nó trả về cái gì thì thêm vào object
//thiếu hạn sử dụng, nếu không thì nó sẽ mặc định là 15 phút :       expiresIn: "15m",
function generateAccessToken(user) {
  return jwt.sign(
    {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
    },
    process.env.JWT_ACCESS_KEY,
    {
      expiresIn: "5s",
    },
  );
}

//generate refresh token
function generateRefreshToken(user) {
  return jwt.sign(
    {
      id: user.id,
      role: user.role,
    },
    process.env.JWT_REFRESH_KEY,
    { expiresIn: "1d" },
  );
}

//request refresh token
async function requestRefreshToken(req, res, next) {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.status(401).json({ message: "You 're not Authenticated." });

    jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY, async (err, user) => {
      if (err) return res.status(403).json({ message: "Refresh token is not valid" });

      const foundUser = await User.findById(user.id).populate("role").exec();
      if (!foundUser) return res.status(404).json({ message: "User not found" });

      const newAccessToken = generateAccessToken(foundUser);
      const newRefreshToken = generateRefreshToken(foundUser);

      res.cookie("refreshToken", newRefreshToken, {
        httpOnly: true,
        secure: false,
        sameSite: "Strict",
        path: "/",
      });

      res.status(200).json({ accessToken: newAccessToken });
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

let refreshTokens = [];

//request refresh token
async function requestRefreshToken2(req, res, next) {
  try {
    const refreshToken = req.cookies.refreshToken;
    console.log(refreshToken);
    if (!refreshToken) return res.status(401).json({ message: "You 're not Authenticated." });
    //check xem refresh token có phải của mình không hay của người khác
    if (!refreshTokens.includes(refreshToken)) return res.status(403).json({ message: "Refresh token is not your." });
    jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY, async (err, user) => {
      if (err) return res.status(403).json({ message: "Refresh token is not valid" });

      //lọc ra refresh token của mình, bây giờ có re token mới rồi thì lọc cái cũ ra
      refreshTokens = refreshTokens.filter((token) => token !== refreshToken);

      const foundUser = await User.findById(user.id).populate("role").exec();
      if (!foundUser) return res.status(404).json({ message: "User not found" });

      const newAccessToken = generateAccessToken(foundUser);
      const newRefreshToken = generateRefreshToken(foundUser);

      //add refresh token mới vào mảng
      refreshTokens.push(newRefreshToken);

      res.cookie("refreshToken", newRefreshToken, {
        httpOnly: true,
        secure: false,
        sameSite: "Strict",
        path: "/",
      });

      res.status(200).json({ accessToken: newAccessToken });
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
//sign up action
async function signup(req, res, next) {
  /**
   * Nghiệp vụ ở đây là:
   * 1. Nếu người dùng tạo tài khoản role User
   *  -> Mặc định field roles lấy từ Frontend là null
   *  -> Sau đó thì gán role member cho người dùng
   *  -> req gửi đến có :"role": "" hay ko đều được
   * 2. Nếu Admin tạo tài khoản
   *  -> Họ có quyền chỉ định tài khoản này role nào ? [Admin, Seller]
   */
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
        // Default role assignment if no role is provided
        const defaultRole = await Role.findOne({ name: "user" }).exec();
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

//sign in action
async function signin(req, res, next) {
  try {
    const { username, password } = req.body;

    // Find user in the database by username
    const user = await User.findOne({ username }).populate("role").exec();
    if (!user) return res.status(404).json({ message: "User not found" });
    // Compare provided password with hashed password in the database
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(401).json({ message: "Wrong password" });

    // Generate tokens
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);
    // console.log(refreshToken);

    // Save refresh token to the database - ở đây không có db nên save tạm vào mảng refreshTokens
    refreshTokens.push(refreshToken);

    // Send response with tokens and user information
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "Strict",
      path: "/",
    });

    res.status(201).json({
      message: "Logged in successfully",
      accessToken,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role.name,
      },
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  signup,
  signin,
  requestRefreshToken,
  requestRefreshToken2,
};
