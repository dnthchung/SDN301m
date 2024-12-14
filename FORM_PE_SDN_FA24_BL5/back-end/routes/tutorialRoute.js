//path : back-end/routes/tutorialRoute.js
import express from "express";
import bodyParser from "body-parser";
import db from "../models/index.js";

const tutorialRouter = express.Router();
tutorialRouter.use(bodyParser.json());

// ========== /1. CALL DB /==================================|
const Tutorial = db.tutorial;
const Comment = db.comment;
const Category = db.category;

// ========== /2. CONTROLLERS /==================================|
async function getTutorials(req, res, next) {
  try {
    const tutorials = await Tutorial.find()
      .populate("images")
      .populate("comments")
      .populate("category", "name description");

    res.status(200).json(tutorials);
  } catch (error) {
    next(error);
  }
}

async function getTutorialComments(req, res, next) {
  try {
    const { id } = req.params;

    const tutorial = await Tutorial.findById(id).populate("comments");

    if (!tutorial) {
      return res.status(404).json({ message: "Tutorial not found" });
    }

    const dataBack = tutorial.comments.map((comment) => {
      return {
        _id: comment._id,
        username: comment.username,
        text: comment.text,
        createdAt: comment.createdAt,
      };
    });

    res.status(200).json(dataBack);
  } catch (error) {
    next(error);
  }
}

async function createTutorial(req, res, next) {
  try {
    const { title, author, category, images } = req.body;

    // 1. Validate the required fields
    if (!title || !author || !category || !Array.isArray(images)) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // 2. Save images to the Images collection
    const savedImages = await Promise.all(
      images.map(async (image) => {
        const newImage = new db.image({
          path: image.path,
          url: image.url,
          caption: image.caption,
        });
        const savedImage = await newImage.save();
        return {
          _id: savedImage._id,
          url: savedImage.url,
          caption: savedImage.caption,
        };
      })
    );

    // 3. Create a new tutorial with the saved images
    const newTutorial = new db.tutorial({
      title,
      author,
      category,
      images: savedImages, // Save images with url and caption into the schema
      comments: [], // Initialize comments as an empty array
    });

    // 4. Save the tutorial
    const savedTutorial = await newTutorial.save();

    // 5. Send the response
    res.status(201).json({
      message: "Tutorial created successfully",
      tutorial: savedTutorial,
    });
  } catch (error) {
    next(error); // Pass any errors to the error handler
  }
}

// ========== /3. ROUTERS /=======================================|
tutorialRouter.get("/", getTutorials);
tutorialRouter.get("/:id/comments", getTutorialComments);
tutorialRouter.post("/create", createTutorial);

export default tutorialRouter;
