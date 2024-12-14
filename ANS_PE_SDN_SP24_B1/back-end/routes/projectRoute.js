import express from "express";
import bodyParser from "body-parser";
import db from "../models/index.js";

const projectRouter = express.Router();
projectRouter.use(bodyParser.json());

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
async function cau11(req, res, next) {
  try {
    // Fetch all projects and populate the department field
    const projects = await Project.find().populate("department");

    // Map the response to include formatted output as required
    const formattedProjects = projects.map((project) => ({
      _id: project._id,
      name: project.name,
      description: project.description,
      startDate: formatDate(project.startDate),
      type: project.type,
      departmentId: project.department?._id || null,
      departmentName: project.department?.name || "No Department",
    }));

    // Return the formatted response
    return res.status(200).json(formattedProjects);
  } catch (error) {
    next(error);
  }
}

async function cau13(req, res, next) {
  try {
    const { name, description, startDate, type, department } = req.body;

    // Create a new project document
    const newProject = await Project.create({
      name,
      description,
      startDate,
      type,
      department,
    });

    // Populate the department data in the response
    const populatedProject = await Project.findById(newProject._id).populate(
      "department"
    );

    // Format the response
    const formattedProject = {
      _id: populatedProject._id,
      name: populatedProject.name,
      description: populatedProject.description,
      startDate: populatedProject.startDate.toISOString(),
      type: populatedProject.type,
      departmentId: populatedProject.department?._id || null,
      departmentName: populatedProject.department?.name || "No Department",
      createdAt: populatedProject.createdAt,
      updatedAt: populatedProject.updatedAt,
      __v: populatedProject.__v,
    };

    // Send the response
    return res.status(201).json(formattedProject);
  } catch (error) {
    next(error);
  }
}

// ========== /3. ROUTER /=======================================|
projectRouter.get("/", cau11);
projectRouter.post("/", cau13);

export default projectRouter;
