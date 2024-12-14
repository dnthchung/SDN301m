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

//cau 1
async function list(req, res, next) {
  try {
    const findData = await Employee.find()
      .populate("jobs")
      .populate("department");
    console.log(findData);

    const finalData = findData.map((s) => {
      return {
        employeeId: s._id,
        fullname: `${s.name.firstName} ${s.name.middleName} ${s.name.lastName}`,
        email: s.account.email,
        department: s.department.name,
        jobs: s.jobs.map((ha) => {
          return {
            name: ha.name,
            issues: ha.issues.map((ni) => {
              return {
                title: ni.title,
                isCompleted: ni.isCompleted,
              };
            }),
          };
        }),
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

employeeRouter.get("/:departmentId", list);

// movieRouter.post("/create", getAllMovies);
// movieRouter.post("/create", create);
// movieRouter.get("/list", getAll);
// movieRouter.get("/by-star/:starId", findMovieByStar);

// ========== /5. NHỚ ĐỔI TÊN ROUTER = ROUTER TRÊN STEP "3" /===========================|
module.exports = employeeRouter;
