const bodyParser = require("body-parser");
const express = require("express");

// ========== / controller /==========
const db = require("../models");
const Movie = db.movie;

//cau 1
async function getAllMovies(req, res, next) {
  try {
    console.log(req.body);
    const newMovie = new Movie({
      title: req.body.title,
      release: req.body.release,
      description: req.body.description,
      producer: req.body.producer,
      director: req.body.director,
      genres: req.body.genres,
      stars: req.body.stars,
    });

    const result = await newMovie.save();
    if (!result) {
      return res.status(400).json({ message: "Cannot create movie" });
    }
    return res.status(201).json(result);
  } catch (error) {
    next(error);
  }
}

//cau 2
async function getAll(req, res, next) {
  try {
    //chú ý populate chỗ star phải có 's' vì khi khai báo model, ta đã khai báo 'stars'
    const result = await Movie.find().populate("producer").populate("director").populate("stars");
    console.log(result);
    if (!result) {
      return res.status(404).json({ message: "Cannot find cake" });
    }

    const finalData = result.map((movie) => {
      return {
        _id: movie._id,
        title: movie.title,
        release: movie.release,
        description: movie.description,
        producer: movie.producer.name,
        director: movie.director.fullname,
        genres: movie.genres,
        stars: movie.stars.map((s) => {
          return s.fullname;
        }),
      };
    });

    return res.status(200).json(finalData);
  } catch (error) {
    next(error);
  }
}

// ========== / routes /==========
const movieRouter = express.Router();
movieRouter.use(bodyParser.json());

// movieRouter.post("/register", register);
movieRouter.post("/create", getAllMovies);
movieRouter.get("/list", getAll);

module.exports = movieRouter;
