const db = require("../models");
const Movie = db.movie;

exports.create = async (req, res, next) => {
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
};

//cau 2
//y a
exports.getAll = async (req, res, next) => {
  try {
    const result = await Movie.find().populate("producer").populate("director").populate({
      path: "stars",
      select: "fullname -_id ",
    });
    if (!result) {
      return res.status(404).json({ message: "Cannot find cake" });
    }
    // console.log(result);

    const newResult = result.map((movie) => {
      return {
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

    return res.status(200).json(newResult);
  } catch (error) {
    next(error);
  }
};
