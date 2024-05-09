import express from 'express';
import { productController } from '../controllers/index.js';

const productRouter = express.Router();

// GET: /products -> Get all products
productRouter.get('/', productController.getAllProducts);

// GET: /products/:id -> Get product by Id
productRouter.get('/:id', productController.getProductByObjectId);

// POST: /products -> Create a new product
productRouter.post('/', productController.createProduct);

export default productRouter;