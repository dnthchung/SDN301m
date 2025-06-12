//path : back-end/routes/index.js
import express from "express";
import bodyParser from "body-parser";
import db from "../models/index.js";

const tutorialRouter = express.Router();
tutorialRouter.use(bodyParser.json());

// ========== /1. CALL DB /==================================|
const Tutorial = db.tutorial;
// ========== /2. CONTROLLERS /==================================|
async function getTutorials(req, res, next) {
  try {
    const tutorials = await Tutorial.find().populate("comments").populate("category");
    const dataBack = tutorials.map((t) => {
      return {
        _id: t._id,
        title: t.title,
        author: t.author,
        images: t.images.map((i) => {
          return {
            _id: i._id,
            url: i.url,
            caption: i.caption,
          };
        }),
        comments: t.comments.map((c) => {
          return {
            _id: c._id,
            username: c.username,
            text: c.text,
            createAt: c.createAt,
          };
        }),

        category: {
          name: t.category.name,
          description: t.category.description,
        },
      };
    });
    res.status(200).json(dataBack);
  } catch (error) {
    next(error);
  }
}
// ========== /3. ROUTERS /=======================================|
tutorialRouter.get("/", getTutorials);

export { tutorialRouter };
