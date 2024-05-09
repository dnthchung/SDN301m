import Products from "../models/product.js";

// Create
const create = async({ name,price, description, images, comments, category}
) => {
    try {
        // Create new product
        const newProduct = await Products.create({name, price, description, images, comments, category})
        // Return newProduct object
        return newProduct._doc;
    } catch (error) {
        throw new Error(error.toString());
    }
};

// Get all
const list = async()=>{
    try {
        return await Products.find({}).populate('category').exec();
    } catch (error) {
        throw new Error(error.toString());
    }
}


// Get single Product by Id
const getById = async(id)=>{
    try {
        return await Products.findOne({_id: id}).populate('category').exec();
    } catch (error) {
        throw new Error(error.toString());
    }
}

const edit = async(id, { name,price, description, images, comments, category}) => {
    try {
        return await Products.findByIdAndUpdate({_id: id}, { name,price, description, images, comments, category}, {new:true});
    } catch (error) {
        throw new Error(error.toString());
    }
}

const deleteProduct = async(id)=>{
    try {
        return await Products.findByIdAndDelete({_id: id});
    } catch (error) {
        throw new Error(error.toString());
    }
}

export default{
    create,
    list,
    getById,
    edit,
    deleteProduct
}