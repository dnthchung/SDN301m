const bodyParser = require("body-parser");
const express = require("express");

const { MovieController } = require("../controllers/index.js");

const movieRouter = express.Router();
movieRouter.use(bodyParser.json());

movieRouter.get("/list", MovieController.getAll);
movieRouter.post("/create", MovieController.create);

module.exports = movieRouter;
