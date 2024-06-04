const db = require("../models");
const User = db.user;

//Create and Save a new User
//1 thời điểm nhiều th gọi nên cần dùng async await
async function create(req, res, next) {
  try {
    console.log({
      email: req.body.email,
      password: req.body.password,
      type: req.body.type,
    });
    //lấy data từ req body
    const newUser = new User({
      email: req.body.email,
      password: req.body.password,
      type: req.body.type,
    });
    //chú ý việc sử dụng save hoặc create
    /**
     * newUser.save() -> dùng để insert 1 bản ghi mới nếu chưa tồn tại -> return Promise ( cả cái object mới vừa insert vào và cả cái objectId của nó luôn)
     * User.create() -> dùng để insert 1 bản ghi mới
     * dùng bao nhieeu then() cung dc
     */
    await newUser
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

//find a user by email
async function findByEmail(req, res, next) {
  try {
    const emailNeed = req.params.email;
    await User.findOne({ email: emailNeed })
      .then((doc) => {
        if (!doc) {
          throw new Error("User not found");
        }
        res.status(200).json(doc);
      })
      .catch((error) => {
        next(error);
      });
  } catch (error) {
    next(error);
  }
}

//find all users
async function findAll(req, res, next) {
  try {
    await User.find({})
      .then((docs) => {
        res.status(200).json(docs);
      })
      .catch((error) => {
        next(error);
      });
  } catch (error) {
    next(error);
  }
}

const userControllers = {
  create,
  findByEmail,
  findAll,
};

module.exports = userControllers;
