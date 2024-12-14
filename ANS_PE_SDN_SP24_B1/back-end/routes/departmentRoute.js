import express from "express";
import bodyParser from "body-parser";
import db from "../models/index.js";

const departmentRouter = express.Router();
departmentRouter.use(bodyParser.json());

// ========== /1. CALL DB /==================================|
const Employee = db.employee;
const Department = db.department;
const Project = db.project;

// Function to format date as DD-MM-YYYY
function formatDate(date) {
  const d = new Date(date);
  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = d.getFullYear();
  return `${day}/${month}/${year}`;
}

// ========== /2. CONTROLLER /==================================|
async function getAllDepartments(req, res, next) {
  try {
    // Fetch all departments from the database
    const departments = await Department.find({});

    // Format the response
    const formattedDepartments = departments.map((department) => ({
      id: department._id,
      name: department.name, // Assuming 'departmentName' is the field name
    }));

    // Return the response
    return res.status(200).json(formattedDepartments);
  } catch (error) {
    next(error);
  }
}

// ========== /3. ROUTER /=======================================|
departmentRouter.get("/", getAllDepartments);

export default departmentRouter;
