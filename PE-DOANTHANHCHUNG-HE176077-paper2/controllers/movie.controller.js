const db = require("../models");
const Movie = db.movie;

//Cau 1 - done a + b +c
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

//Cau 2 - don a + b + c
exports.getAll = async (req, res, next) => {
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
};

//Cau 3
exports.findMovieByGenre = async (req, res, next) => {
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
};

//Cau 4
exports.countMovieByProducer = async (req, res, next) => {
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
};

//Cau 5
exports.removeStarIdFromMovieId = async (req, res, next) => {
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
};
