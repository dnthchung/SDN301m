import mongoose from "mongoose";

// ================1. Import all models here ================
import Employee from "./employee.model.js";
import Department from "./department.model.js";
import Project from "./project.model.js";

mongoose.Promise = global.Promise;

const db = {};

// ================2. Create schema here ================
db.employee = Employee;
db.department = Department;
db.project = Project;

// ====================================================
db.connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: process.env.DB_NAME,
    });
    console.log(
      "Successfully connected to MongoDB database " + process.env.DB_NAME
    );
  } catch (err) {
    console.error(err.message);
    process.exit();
  }
};

export default db;
