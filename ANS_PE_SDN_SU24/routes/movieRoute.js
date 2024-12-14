const bodyParser = require("body-parser");
const express = require("express");
const db = require("../models");

//=========== /1. KHAI BÁO DB / ===================|
const Movie = db.movie;
const Star = db.star;
const Producer = db.producer;
const Director = db.director;

// ========== /2. CONTROLLER /==================================|
//Cau 1 - chú ý trường hợp input là những khoảng trắng
async function create(req, res, next) {
  try {
    // console.log(req.body);
    // Kiểm tra trường title - tránh title toàn space
    const { title } = req.body;
    if (!title || !title.trim()) {
      return res.status(500).json({
        error: {
          status: 500,
          message: "Movie validation failed: title: Path `title` is required.",
        },
      });
    }

    const newMovie = new Movie({
      title: title,
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

//Cau 2
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

//Cau 3
async function findMovieByGenre(req, res, next) {
  try {
    const genreName = req.params.genre;
    const movieFound = await Movie.find({ genres: genreName }).populate("producer").populate("director").populate("stars");

    //check movieFound (array) is empty or not || if not found, return [] => check null
    if (movieFound.length === 0) {
      //custom error message :  trả về 1 object error với status code 404 và message là "The movie genre does not exist"
      return res.status(404).json({
        error: {
          status: 404,
          message: "The movie genre does not exist",
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

//Cau 4
async function countMovieByProducer(req, res, next) {
  try {
    const producerNameReceive = req.params.producerName;

    //replacing multiple spaces with a single space
    function handleData(producerName) {
      return producerName.replace(/\s+/g, " ").trim();
    }

    //find producer by name
    const producerFound = await db.producer.findOne({ name: handleData(producerNameReceive) });
    if (!producerFound) {
      return res.status(404).json({
        error: {
          status: 404,
          message: "This producer does not exist",
        },
      });
    }

    //Count số phim mà producer đó sản xuất
    //cách 1 : dùng hàm find
    const movieFound = await Movie.find({ producer: producerFound._id });
    const count = movieFound.length;
    // console.log(count);

    //cách 2 : dùng hàm countDocuments
    const movieFound2 = await Movie.countDocuments({ producer: producerFound._id });
    // console.log(movieFound2);

    const dataBack = {
      producer: producerFound.name,
      numberOfMovie: count,
    };

    return res.status(200).json(dataBack);
  } catch (error) {
    next(error);
  }
}

//Cau 5
async function removeStarIdFromMovieId(req, res, next) {
  try {
    const moveId = req.params.movieId;
    const starId = req.params.starId;
    console.log("moveId", moveId);
    console.log("starId", starId);

    //find movie
    const movieFound = await Movie.findById(moveId).populate("stars").populate("producer").populate("director");
    if (!movieFound) {
      return res.status(404).json({
        error: {
          status: 404,
          message: "This movie does not exist",
        },
      });
    }

    //find star in movie and remove it by starId
    const starIndex = movieFound.stars.indexOf(starId);
    console.log("starIndex", starIndex);

    if (starIndex === -1) {
      return res.status(404).json({
        error: {
          status: 404,
          message: "This star does not exist in this movie",
        },
      });
    }

    //Không thêm giá trị nào vào vị trí starIndex, chỉ xóa 1 phần tử tính từ vị trí starIndex
    movieFound.stars.splice(starIndex, 1);
    await movieFound.save();

    return res.status(200).json(movieFound);
  } catch (error) {
    next(error);
  }
}

// ========== /3. ĐỔI TÊN ROUTER (MOVIE) /=======================================|
const movieRouter = express.Router();
movieRouter.use(bodyParser.json());

// ========== /4. KHAI BÁO CÁC ROUTES CHO CÁC FUNCTION /=========|
//cau1
movieRouter.post("/create", create);
//cau2
movieRouter.get("/list", getAll);
//cau3
movieRouter.get("/by-genre/:genre", findMovieByGenre);
//cau4
movieRouter.get("/count-by-producer/:producerName", countMovieByProducer);
//cau5
movieRouter.put("/:movieId/remove-star/:starId", removeStarIdFromMovieId);

// ========== /5. NHỚ ĐỔI TÊN ROUTER = ROUTER TRÊN STEP "3" /===========================|
module.exports = movieRouter;
