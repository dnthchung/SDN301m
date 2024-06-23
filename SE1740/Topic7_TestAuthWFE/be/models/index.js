const mongoose = require("mongoose");

const User = require("./user.model");
const Role = require("./role.model");

mongoose.Promise = global.Promise;
const db = {};
db.user = User;
db.role = Role;
//chỉ định các vai trò cho người dùng ngay từ khi khởi tạo
// db.ROLES = ["member", "admin", "mod"];

db.connectDB = async () => {
  mongoose
    .connect(process.env.MONGO_URI, {
      dbName: process.env.DB_NAME,
    })
    .then(() => {
      console.log("Successfully connect to MongoDB.");
    })
    .catch((err) => {
      console.error(err.message);
      process.exit();
    });
};
module.exports = db;
