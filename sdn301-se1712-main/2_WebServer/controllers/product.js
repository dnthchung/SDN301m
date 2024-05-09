import { productRepo } from "../repositories/index.js";

// GET: Get all products
const getAllProducts = async(req, res) => {
    try {
        res.status(200).json(await productRepo.list());
    } catch (error) {
        res.status(500).json({
            message: error.toString()
        })
    }
}

// GET: Get product by Id
const getProductByObjectId = async(req, res) => {
    try {
        res.status(200).json(await productRepo.fetchById(req.params.id));
    } catch (error) {
        res.status(500).json({
            message: error.toString()
        })
    }
}

// POST: Create a new Product
const createProduct = async(req, res)=>{
    try {
        // Get data from Request body
        const {name, price, description, category} = req.body;
        const result = await productRepo.create({name, price, description, category});
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({
            error: error.toString()
        })
    }
}

export default{
    getAllProducts,
    getProductByObjectId,
    createProduct
}