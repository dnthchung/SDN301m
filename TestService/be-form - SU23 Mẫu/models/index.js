const mongoose = require("mongoose");

const Topping = require("./topping.model");
const Cake = require("./cake.model");
const Option = require("./option.model");

mongoose.Promise = global.Promise;
const db = {};

db.topping = Topping;
db.cake = Cake;
db.option = Option;

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
