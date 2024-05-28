const mongoose = require("mongoose");

const User = require("./user.models");
//other models

//set up mongoose use global promise
mongoose.Promise = global.Promise;

//khai báo đối tượng đại diện CSDL cần làm việc của MongoDB server
const db = {};
db.mongoose = mongoose;

//khai báo các model cần làm việc
db.User = User;

module.exports = db;
