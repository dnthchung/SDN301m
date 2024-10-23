const mongoose = require("mongoose");

// ================ import all models here ================
const Producer = require("./producer.model");
const Director = require("./director.model");
const Movie = require("./movie.model");
const Star = require("./star.model");

mongoose.Promise = global.Promise;
const db = {};

// ================ create schema here ================
db.producer = Producer;
db.director = Director;
db.movie = Movie;
db.star = Star;

db.connectDB = async () => {
  mongoose
    .connect(process.env.MONGO_URI, {
      dbName: process.env.DB_NAME,
    })
    .then(() => {
      console.log("Successfully connect to MongoDB name " + process.env.DB_NAME);
    })
    .catch((err) => {
      console.error(err.message);
      process.exit();
    });
};
module.exports = db;
