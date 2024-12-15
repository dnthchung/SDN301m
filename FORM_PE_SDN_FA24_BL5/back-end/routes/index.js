//path : back-end/routes/tutorialRoute.js
import express from "express";
import bodyParser from "body-parser";
import db from "../models/index.js";

const tutorialRouter = express.Router();
const categoryRouter = express.Router();

categoryRouter.use(bodyParser.json());
tutorialRouter.use(bodyParser.json());

// ========== /1. CALL DB /==================================|
const Tutorial = db.tutorial;
const Category = db.category;

// ========== /2. CONTROLLERS /==================================|
async function getTutorials(req, res, next) {
  try {
    const tutorials = await Tutorial.find()
      .populate("images")
      .populate("comments")
      .populate("category", "name description");

    const dataBack = tutorials.map((tutorial) => {
      return {
        _id: tutorial._id,
        title: tutorial.title,
        author: tutorial.author,
        images: tutorial.images.map((myImage) => {
          return {
            _id: myImage._id,
            url: myImage.url,
            caption: myImage.caption,
          };
        }),
        comments: tutorial.comments.map((myComment) => {
          return {
            _id: myComment._id,
            username: myComment.username,
            text: myComment.text,
            createdAt: myComment.createdAt,
          };
        }),
        category: {
          _id: tutorial.category._id,
          name: tutorial.category.name,
          description: tutorial.category.description,
        },
      };
    });

    res.status(200).json(dataBack);
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

    if (!title || !author || !category || !Array.isArray(images)) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    //Save images to the Images collection
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

    //Create a new tutorial with the saved images
    const newTutorial = new db.tutorial({
      title,
      author,
      category,
      images: savedImages,
      comments: [],
    });

    const savedTutorial = await newTutorial.save();
    res.status(201).json(savedTutorial);
  } catch (error) {
    next(error);
  }
}

async function getAllCategories(req, res, next) {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

// ========== /3. ROUTERS /=======================================|
tutorialRouter.get("/", getTutorials);
tutorialRouter.get("/:id/comments", getTutorialComments);
tutorialRouter.post("/create", createTutorial);

categoryRouter.get("/", getAllCategories);

export { tutorialRouter, categoryRouter };
