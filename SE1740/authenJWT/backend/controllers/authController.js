const db = require("../models");
const brycpt = require("bcrypt");

//gọi ra các đối tượng từ db
const User = db.user;
const Role = db.role;

//sign up action
async function signup(req, res, next) {
  try {
    if (req.body) {
      const newUser = new User({
        email: req.body.email,
        password: brycpt.hashSync(req.body.password, parseInt(process.env.PASSWORD_KEY)),
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
async function signin(req, res, next) {}

module.exports = {
  signup,
  signin,
};
