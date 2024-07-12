const mongoose = require("mongoose");

const User = require("./user.model");
const Employee = require("./employee.model");
const Department = require("./department.model");
const Project = require("./project.model");

mongoose.Promise = global.Promise;
const db = {};
db.user = User;
db.employee = Employee;
db.department = Department;
db.project = Project;
//chỉ định các vai trò cho người dùng ngay từ khi khởi tạo

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
