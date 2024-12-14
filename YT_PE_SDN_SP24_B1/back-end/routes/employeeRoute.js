import express from "express";
import bodyParser from "body-parser";
import db from "../models/index.js";

const Employee = db.employee;
const Department = db.department;
const Project = db.project;

// ========== /2. CONTROLLER /==================================|
// async function create(req, res, next) {
//   try {
//     const { title } = req.body;
//     if (!title || !title.trim()) {
//       return res.status(500).json({
//         error: {
//           status: 500,
//           message: "Movie validation failed: title: Path `title` is required.",
//         },
//       });
//     }

//     const newMovie = new Movie({
//       title: title,
//       release: req.body.release,
//       description: req.body.description,
//       producer: req.body.producer,
//       director: req.body.director,
//       genres: req.body.genres,
//       stars: req.body.stars,
//     });

//     const result = await newMovie.save();
//     if (!result) {
//       return res.status(400).json({ message: "Cannot create movie" });
//     }
//     return res.status(201).json(result);
//   } catch (error) {
//     next(error);
//   }
// }

// ========== /3. ROUTER /=======================================|
const employeeRouter = express.Router();
employeeRouter.use(bodyParser.json());

// employeeRouter.post("/create", create);

export default employeeRouter;
