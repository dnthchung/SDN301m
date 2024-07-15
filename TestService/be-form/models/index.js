const mongoose = require("mongoose");

// const User = require("./user.model");
// const Role = require("./role.model");
// const Leader = require("./leader.model");
// const Promotion = require("./promotion.model");
// const Person = require("./person.model");
// const Story = require("./story.model");

mongoose.Promise = global.Promise;
const db = {};

// db.user = User;
// db.role = Role;
// db.leader = Leader;
// db.promotion = Promotion;
// db.person = Person;
// db.story = Story;

db.connectDB = async () => {
  mongoose
    .connect(process.env.MONGO_URI, {
      dbName: process.env.DB_NAME,
    })
    .then(() => {
      console.log("Successfully connect to MongoDB.");
    })
    .catch((err) => {
      console.error(err.message);
      process.exit();
    });
};
module.exports = db;
