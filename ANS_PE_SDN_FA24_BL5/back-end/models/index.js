//path : back-end/models/index.js
import mongoose from "mongoose";

// ================1. Import all models here ================
import Tutorial from "./tutorial.model.js";
import Category from "./category.model.js";
import Comment from "./comment.model.js";
import Image from "./image.model.js";
mongoose.Promise = global.Promise;

const db = {};

// ================2. Create schema here ================
db.tutorial = Tutorial;
db.category = Category;
db.comment = Comment;
db.image = Image;

// ====================================================
db.connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: process.env.DB_NAME,
    });
    console.log(
      "Successfully connected to MongoDB database " + process.env.DB_NAME
    );
  } catch (err) {
    console.error(err.message);
    process.exit();
  }
};

export default db;
