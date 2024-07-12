const bodyParser = require("body-parser");
const express = require("express");

const { EmployeeController } = require("../controllers/index.js");
const verifyJWT = require("../middleware/verifyJWT.js");

const employeeRoute = express.Router();
employeeRoute.use(bodyParser.json());

employeeRoute.get("/:dept", EmployeeController.getEmployees);

module.exports = employeeRoute;
