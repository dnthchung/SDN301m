const bodyParser = require("body-parser");
const express = require("express");

const { ProjectController } = require("../controllers/index.js");
const verifyJWT = require("../middleware/verifyJWT.js");

const projectRoute = express.Router();
projectRoute.use(bodyParser.json());

//create router
projectRoute.get("/", ProjectController.getAllProjectsWithDepartment);
projectRoute.post("/", ProjectController.createProject);

//for fe
projectRoute.get("/all", verifyJWT.verifyToken, ProjectController.getAllProjectsFE);

module.exports = projectRoute;
