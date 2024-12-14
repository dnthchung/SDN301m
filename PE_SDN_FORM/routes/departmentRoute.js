const bodyParser = require("body-parser");
const express = require("express");

// ==============================================|
const db = require("../models");
const mongoose = require("mongoose");

//=========== /1. KHAI BÁO DB / ===================|
// const Movie = db.movie;
// const Star = db.star;
// const Producer = db.producer;
// const Director = db.director;

const Job = db.job;
const Department = db.department;
const Employee = db.employee;

// ========== /2. CONTROLLER /==================================|

async function list2(req, res, next) {
  try {
    const departmentId = req.params.departmentId;

    const findData = await Department.find({ _id: departmentId });
    console.log(findData);

    const findEmployee = await Employee.find({ department: findData })
      .populate("jobs")
      .populate("department");

    console.log(findEmployee);

    // const findData = await Employee.find()
    //   .populate("jobs")
    //   .populate("department");
    // console.log(findData);

    const employeesList = findEmployee.map((s) => {
      return {
        id: s._id,
        fullName: `${s.name.firstName} ${s.name.middleName} ${s.name.lastName}`,
      };
    });

    const managerName = findEmployee.map((s) => {
      return s.manager;
    });

    const finalData = findData.map((s) => {
      return {
        department: s.name,
        // manager: managerName,
        employee: employeesList,
      };
    });

    return res.status(201).json(finalData);
  } catch (error) {
    next(error);
  }
}
// ========== /3. ĐỔI TÊN ROUTER (MOVIE) /=======================================|
const employeeRouter = express.Router();
employeeRouter.use(bodyParser.json());

// ========== /4. KHAI BÁO CÁC ROUTES CHO CÁC FUNCTION /=========|

employeeRouter.get("/:departmentId", list2);

// movieRouter.post("/create", getAllMovies);
// movieRouter.post("/create", create);
// movieRouter.get("/list", getAll);
// movieRouter.get("/by-star/:starId", findMovieByStar);

// ========== /5. NHỚ ĐỔI TÊN ROUTER = ROUTER TRÊN STEP "3" /===========================|
module.exports = employeeRouter;
