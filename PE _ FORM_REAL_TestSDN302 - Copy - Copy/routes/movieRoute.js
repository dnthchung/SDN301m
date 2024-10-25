const bodyParser = require("body-parser");
const express = require("express");

// ========== / controller /==========
const db = require("../models");
const mongoose = require("mongoose");

const Movie = db.movie;
const Star = db.star;
const Producer = db.producer;
const Director = db.director;

//cau 1
async function getAllMovies(req, res, next) {
  try {
    // console.log(req.body);
    // const title = req.body.title;
    // const release = req.body.release;
    // const description = req.body.description;

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
    // console.log(result);
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

//cau 3 by-star/:starId
async function findMovieByStar(req, res, next) {
  try {
    const starId = req.params.starId;

    // Validate if the starId is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(starId)) {
      return res.status(404).json({
        error: {
          status: 404,
          message: "This star does not exist",
        },
      });
    }

    // Find star by ID
    const starFound = await Star.findById(starId);
    if (!starFound) {
      return res.status(404).json({
        error: {
          status: 404,
          message: "This star does not exist",
        },
      });
    }

    // Find movies associated with the star
    const movieFound = await Movie.find({ stars: starId }).populate("producer").populate("director").populate("stars");

    if (movieFound.length === 0) {
      return res.status(404).json({
        error: {
          status: 404,
          message: "The movie star does not exist",
        },
      });
    }

    const finalData = movieFound.map((movie) => {
      return {
        _id: movie._id,
        title: movie.title,
        release: movie.release,
        description: movie.description,
        producer: movie.producer.name,
        director: movie.director.fullname,
        genres: movie.genres,
        stars: movie.stars.map((s) => s.fullname),
      };
    });

    return res.status(200).json(finalData);
  } catch (error) {
    next(error);
  }
}

// ================ Trial ==========

async function create(req, res, next) {
  // const titleInput = req.body.title;
  // if(){

  // }

  const newMovie = new Movie({
    title: req.body.title,
    release: req.body.release,
    description: req.body.description,
    producer: req.body.producer,
    director: req.body.director,
    genres: req.body.genres,
    stars: req.body.stars,
  });

  const saveResult = await newMovie.save();

  return res.status(201).json(saveResult);
}

// ========== / routes /==========
const movieRouter = express.Router();
movieRouter.use(bodyParser.json());

// movieRouter.post("/create", getAllMovies);
movieRouter.post("/create", create);
movieRouter.get("/list", getAll);
movieRouter.get("/by-star/:starId", findMovieByStar);

module.exports = movieRouter;
