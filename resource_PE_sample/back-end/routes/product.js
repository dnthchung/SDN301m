import express from 'express';
import Products from '../models/product.js';
import Categories from '../models/category.js';
import createError from 'http-errors';

const productRouter = express.Router();

// GET: /products -> Get all products
productRouter.get('/', async(req, res, next)=>{
    try {
        const products = await Products.find({}).populate('category').exec();
        res.send(products);
    } catch (error) {
        next(error)
    }
})

// GET: /products/:id -> Get product by Id
productRouter.get('/:id', async(req, res, next)=>{
    try {
        const product = await Products.findOne({_id:req.params.id}).populate('category').exec();
        res.send(product);
    } catch (error) {
        next(error)
    }
})

// POST: /products -> Create a new product
productRouter.post('/', async(req, res, next)=>{
    try {
        const {name, price, description, images, comments, category} = req.body;
        
        // Check: Product name existing
        const existProduct = await Products.findOne({name: name}).exec();
        if(existProduct)
            throw createError.Conflict(`${name} is already existing.`);

        // Check: Product name is required
        if(!name)
            throw createError.NotFound('Product name is required');

        const savedProduct = await Products.create({name, price, description, images, comments, category});
        res.send(savedProduct);
    } catch (error) {
        next(error)
    }
})

export default productRouter;