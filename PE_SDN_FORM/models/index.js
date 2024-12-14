const mongoose = require("mongoose");

// ================1. import all models here ================
const Job = require("./job.model");
const Employee = require("./employee.model");
const Department = require("./department.model");

mongoose.Promise = global.Promise;
const db = {};

// ================2. create schema here ================
db.job = Job;
db.employee = Employee;
db.department = Department;

// ====================================================
db.connectDB = async () => {
  mongoose
    .connect(process.env.MONGO_URI, {
      dbName: process.env.DB_NAME,
    })
    .then(() => {
      console.log(
        "Successfully connect to MongoDB name " + process.env.DB_NAME
      );
    })
    .catch((err) => {
      console.error(err.message);
      process.exit();
    });
};
module.exports = db;
