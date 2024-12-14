import express from "express";
import bodyParser from "body-parser";
import db from "../models/index.js";

const Employee = db.employee;
const Department = db.department;
const Project = db.project;

// ========== /2. CONTROLLER /==================================|

// ========== /3. ROUTER /=======================================|
const projectRouter = express.Router();
projectRouter.use(bodyParser.json());

// projectRouter.post("/create", create);

export default projectRouter;
