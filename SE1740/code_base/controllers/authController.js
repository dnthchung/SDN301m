const db = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const config = require("../config/auth.config");

//gọi ra các đối tượng từ db
const User = db.user;
const Role = db.role;

//sign up action
async function signup(req, res, next) {
  try {
    if (req.body) {
      const newUser = new User({
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, parseInt(process.env.PASSWORD_KEY)),
        type: req.body.type,
      });

      //tức là nhận 1 mảng cc role từ người dùng, và check xem role đó có trong db không
      if (req.body.roles) {
        const roles = await Role.find({ name: { $in: req.body.roles } }).exec();
        //gán các vai trò cho người dùng(update roles for new user)
        newUser.roles = roles.map((role) => role._id);
        //save user
        await User.create(newUser).then((addUser) => {
          res.status(201).json(addUser);
        });
      } else {
        //visitor create new User
        const role = await Role.findOne({ name: "member" }).exec();
        newUser.roles = [role._id];
        await User.create(newUser).then((addUser) => {
          res.status(201).json({
            message: "User was registered successfully!",
            user: addUser,
          });
        });
      }
    }
  } catch (error) {
    next(error);
  }
}

//sign in action
async function signin(req, res, next) {
  try {
    const existUser = await User.findOne({ email: req.body.email }).populate("roles", "-__v").exec();
    if (!existUser) {
      return res.status(404).json({ message: "User Not found." });
    }
    const passwordIsValid = bcrypt.compareSync(req.body.password, existUser.password);
    if (!passwordIsValid) throw createError(401, "Invalid Password!");

    //jwt
    const token = jwt.sign({ id: existUser.id }, config.secret, {
      expiresIn: config.jwtExpiration,
    });
    const authorities = [];
    for (let i = 0; i < existUser.roles.length; i++) {
      authorities.push("ROLE_" + existUser.roles[i].name);
    }
    res.status(200).json({
      id: existUser._id,
      email: existUser.email,
      accessToken: token,
      roles: authorities,
    });
  } catch (error) {}
}

module.exports = {
  signup,
  signin,
};
