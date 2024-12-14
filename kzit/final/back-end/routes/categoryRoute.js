import express from "express";
import bodyParser from "body-parser";
import db from "../models/index.js";

const categoryRouter = express.Router();
categoryRouter.use(bodyParser.json());

// ========== /1. CALL DB /==================================|
const Tutorial = db.tutorial;
const Image = db.image;
const Comment = db.comment;
const Category = db.category;

// ========== /2. CONTROLLER /==================================|
//async function cau1 (req, res,next) {}
async function getAllCategories(req, res, next) {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

// ========== /3. ROUTER /=======================================|
//projectRouter.post("/url", cau1);
categoryRouter.get("/", getAllCategories);

export default categoryRouter;
