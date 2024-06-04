const mongoose = require("mongoose");

const User = require("./user.models");
//other models

//set up mongoose use global promise
mongoose.Promise = global.Promise;

//khai báo đối tượng đại diện CSDL cần làm việc của MongoDB server
const db = {};

//khai báo các model cần làm việc
db.user = User;
db.connectDB = async () => {
  mongoose
    .connect(process.env.MONGO_URI, {
      dbName: process.env.DB_NAME,
      //có thể chứa user, pass, port, host, ... để đnăg nhập vào MongoDB server
    })
    .then(() => {
      console.log("Successfully connect to MongoDB.");
    })
    .catch((err) => {
      //chỉ lấy ra lỗi j , lấy ra thông điệp lỗi
      console.error(err.message);
      process.exit();
    });
};

module.exports = db;
