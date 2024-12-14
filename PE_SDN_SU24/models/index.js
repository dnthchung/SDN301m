const mongoose = require("mongoose");

// ================1. import all models here ================

// ==========================================================
mongoose.Promise = global.Promise;
const db = {};

// ================2. create schema here ================

// ====================================================
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
