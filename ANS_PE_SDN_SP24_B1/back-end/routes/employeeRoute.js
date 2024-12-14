import express from "express";
import bodyParser from "body-parser";
import db from "../models/index.js";

const employeeRouter = express.Router();
employeeRouter.use(bodyParser.json());

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
async function cau12(req, res, next) {
  try {
    const departmentId = req.params.dept;

    // Fetch employees belonging to the specified department
    const employees = await Employee.find({
      department: departmentId,
    }).populate("department");

    // Format the response
    const formattedEmployees = employees.map((employee) => ({
      _id: employee._id,
      name: employee.name,
      dob: formatDate(employee.dob),
      gender: employee.gender,
      position: employee.position,
    }));

    // Return the response
    return res.status(200).json(formattedEmployees);
  } catch (error) {
    next(error);
  }
}

// ========== /3. ROUTER /=======================================|
employeeRouter.get("/:dept", cau12);

export default employeeRouter;
