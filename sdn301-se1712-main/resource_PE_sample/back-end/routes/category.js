import express from 'express';
import Categories from '../models/category.js';

const CategoryRouter = express.Router();

// GET: /categories -> Get all categories
CategoryRouter.get('/', async(req, res, next)=>{
    try {
        const categories = await Categories.find({}).exec();
        res.send(categories);
    } catch (error) {
        next(error)
    }
})

export default CategoryRouter;