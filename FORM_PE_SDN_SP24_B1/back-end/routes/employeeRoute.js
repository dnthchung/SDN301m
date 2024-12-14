import express from "express";
import bodyParser from "body-parser";
import db from "../models/index.js";

const employeeRouter = express.Router();
employeeRouter.use(bodyParser.json());

// ========== /1. CALL DB /==================================|
const Employee = db.employee;
const Department = db.department;
const Project = db.project;

// ========== /2. CONTROLLER /==================================|
//async function cau1 (req, res,next) {}

// ========== /3. ROUTER /=======================================|
//projectRouter.post("/url", cau1);

export default employeeRouter;
