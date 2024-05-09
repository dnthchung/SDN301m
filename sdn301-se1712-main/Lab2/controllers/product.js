import { ProductRepo } from '../repositories/index.js';

// GET: /products
const getProducts = async (req, res) => {
    try {
        res.status(200).json(await ProductRepo.list())
    } catch (error) {
        res.status(500).json({
            message: error.toString()
        })
    }
}

// GET: /products/1
const getProductById = async (req, res) => {
    try {
        res.status(200).json(await ProductRepo.getById(req.params.id))
    } catch (error) {
        res.status(500).json({
            message: error.toString()
        })
    }
}

// POST: /products
const createProduct = async (req, res) => {
    try {
        // Get object from request body
        const {name, price, description, images,comments,category} = req.body;
        const newUser = await ProductRepo.create({ name, price, description, images, comments, category });
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({message: error.toString()});
    }
}

// PUT: /products/1
const editProduct = async(req,res)=>{
    try {
        res.status(200).json(await ProductRepo.edit(req.params.id,req.body));
    } catch (error) {
        res.status(500).json({
            error: error.toString()
        });
    }
}

// DELETE: /products/1
const deleteProduct = async(req,res)=>{
    try {
        res.status(200).json(await ProductRepo.deleteProduct(req.params.id));
    } catch (error) {
        res.status(500).json({
            error: error.toString()
        });
    }
}

export default {
    getProducts,
    getProductById,
    createProduct,
    editProduct,
    deleteProduct
}