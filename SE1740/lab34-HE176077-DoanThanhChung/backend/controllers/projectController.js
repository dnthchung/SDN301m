const db = require("../models");
const Project = db.project;
const Department = db.department;

// Function to format date in dd/mm/yyyy
function formatDate(date) {
  const d = new Date(date);
  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = d.getFullYear();
  return `${day}/${month}/${year}`;
}

async function getAllProjectsWithDepartment(req, res, next) {
  try {
    const projects = await Project.find().populate("department").exec();
    const formattedProjects = projects.map((project) => {
      const department = project.department || {};
      return {
        _id: project._id,
        name: project.name,
        description: project.description,
        startDate: formatDate(project.startDate),
        type: project.type,
        departmentId: department._id ? department._id.toString() : null,
        departmentName: department.name || null,
      };
    });
    res.status(200).json(formattedProjects);
  } catch (error) {
    console.error("Error:", error);
    next(error);
  }
}

// Using POST method to create a new Project
// Data JSON return: name, description, startDate, type, department : department id(string), _id (of project), createdAt, updatedAt, __v
async function createProject(req, res, next) {
  try {
    const { name, description, startDate, type, department } = req.body;
    const newProject = new Project({
      name,
      description,
      startDate,
      type,
      department,
    });
    const savedProject = await newProject.save();
    const populatedProject = await Project.findById(savedProject._id).populate("department").exec();
    const response = {
      _id: populatedProject._id,
      name: populatedProject.name,
      description: populatedProject.description,
      startDate: formatDate(populatedProject.startDate),
      type: populatedProject.type,
      department: newProject.department,
      createdAt: populatedProject.createdAt,
      updatedAt: populatedProject.updatedAt,
      __v: populatedProject.__v,
    };
    res.status(201).json(response);
  } catch (error) {
    console.error("Error:", error);
    next(error);
  }
}

//get all project with department (name) - FE
async function getAllProjectsFE(req, res, next) {
  try {
    const projects = await Project.find().populate("department").exec();
    const formattedProjects = projects.map((project) => {
      const department = project.department;
      return {
        _id: project._id,
        name: project.name,
        description: project.description,
        startDate: formatDate(project.startDate),
        type: project.type,
        department: department.name,
      };
    });
    res.status(200).json(formattedProjects);
  } catch (error) {
    console.error("Error:", error);
    next(error);
  }
}

module.exports = { getAllProjectsWithDepartment, createProject, getAllProjectsFE };
