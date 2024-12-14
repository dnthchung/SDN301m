import express from "express";
import bodyParser from "body-parser";
import db from "../models/index.js";

const tutorialRouter = express.Router();
tutorialRouter.use(bodyParser.json());

// ========== /1. CALL DB /==================================|
const Tutorial = db.tutorial;
const Image = db.image;
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
    const { title, description, images, category, comments } = req.body;

    // Save images to Images collection
    const savedImages = await Promise.all(
      images.map(async (image) => {
        const newImage = new Image({
          path: image.path,
          url: image.url,
          caption: image.caption,
        });
        return await newImage.save();
      })
    );

    const newTutorial = new Tutorial({
      title,
      description,
      images: savedImages.map((img) => img._id),
      category,
      comments,
    });

    const savedTutorial = await newTutorial.save();

    res.status(201).json({
      message: "Tutorial created successfully",
      tutorial: savedTutorial,
    });
  } catch (error) {
    next(error);
  }
}

// ========== /3. ROUTERS /=======================================|
tutorialRouter.get("/", getTutorials);
tutorialRouter.get("/:id/comments", getTutorialComments);
tutorialRouter.post("/create", createTutorial);

export default tutorialRouter;
