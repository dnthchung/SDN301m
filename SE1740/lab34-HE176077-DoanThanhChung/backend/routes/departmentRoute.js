const bodyParser = require("body-parser");
const express = require("express");

const { DepartmentController } = require("../controllers/index.js");
const verifyJWT = require("../middleware/verifyJWT.js");

const departmentRoute = express.Router();
departmentRoute.use(bodyParser.json());

module.exports = departmentRoute;
