const db = require("../models");
const mongoose = require("mongoose");
const Movie = db.movie;
const Star = db.star;

//Cau 1
exports.create = async (req, res, next) => {
  try {
    console.log(req.body);

    // Validate title to ensure it is not just spaces or empty
    const title = req.body.title;
    if (!title || title.trim() === "") {
      return res.status(400).json({ message: "Title cannot be empty or only spaces" });
    }

    const newMovie = new Movie({
      title: title.trim(), // Save trimmed version of title
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
};

//Cau 2
exports.getAll = async (req, res, next) => {
  try {
    // Ensure 'stars' is populated as expected, since it's declared as 'stars' in the model
    const result = await Movie.find().populate("producer").populate("director").populate("stars");

    console.log(result);
    if (!result) {
      return res.status(404).json({ message: "Cannot find movie" });
    }

    const finalData = result.map((movie) => {
      return {
        _id: movie._id,
        title: movie.title,
        release: movie.release,
        description: movie.description,
        producer: movie.producer?.name || "Unknown",
        director: movie.director?.fullname || "Unknown",
        genres: movie.genres,
        stars: movie.stars.map((star) => ({
          id: star._id,
          name: star.fullname,
        })),
      };
    });

    return res.status(200).json(finalData);
  } catch (error) {
    next(error);
  }
};

//Cau 3 by-star/:starId
exports.findMovieByStar = async (req, res, next) => {
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
};
