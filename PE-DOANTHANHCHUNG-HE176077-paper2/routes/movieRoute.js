const bodyParser = require("body-parser");
const express = require("express");

const { MovieController } = require("../controllers/index.js");

const movieRouter = express.Router();
movieRouter.use(bodyParser.json());

//cau1
movieRouter.get("/list", MovieController.getAll);
//cau2
movieRouter.post("/create", MovieController.create);
//cau3
movieRouter.get("/by-genre/:genre", MovieController.findMovieByGenre);
//cau4
movieRouter.get("/count-by-producer/:producerName", MovieController.countMovieByProducer);
//cau5
movieRouter.put("/:movieId/remove-star/:starId", MovieController.removeStarIdFromMovieId);

module.exports = movieRouter;
