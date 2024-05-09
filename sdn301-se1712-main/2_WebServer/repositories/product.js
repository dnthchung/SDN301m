import Products from "../models/product.js";

// C: Create a new Product
const create = async({name, price, description, category}) => {
    try {
        const newProduct = await Products.create({name, price, description, category});
        return newProduct._doc;
    } catch (error) {
        throw new Error(error.toString());
    }
}

// R: Fetch all Products
const list = async()=>{
    try {
        return await Products.find({}).exec();
    } catch (error) {
        throw new Error(error.toString());
    }
}

// R: Fetch single Product by ObjectId
const fetchById = async(id)=>{
    try {
        return await Products.findOne({_id: id}).exec();
    } catch (error) {
        throw new Error(error.toString());
    }
}

// U: Update a product


// D: Delete a product

export default {
    create,
    list,
    fetchById
}