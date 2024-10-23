const bodyParser = require("body-parser");
const express = require("express");

const { MovieController } = require("../controllers/index.js");

const movieRouter = express.Router();
movieRouter.use(bodyParser.json());

//cau1
movieRouter.get("/list", MovieController.getAll);
//cau2
movieRouter.post("/create", MovieController.create);
//cau3 : by-star/:starId
movieRouter.get("/by-star/:starId", MovieController.findMovieByStar);

module.exports = movieRouter;
