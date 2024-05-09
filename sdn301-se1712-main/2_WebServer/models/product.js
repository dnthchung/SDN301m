import mongoose, { Schema } from "mongoose";

// Create Product schema
const productSchema = new Schema({
    name:{
        type: String,
        required: [true, 'Name is required'], // Validation
        unique: true
    },
    price:{
        type: Number,
        required: true,
        min: [0, 'Price must be greater than or equals to zero']
    },
    description:{
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    }
},{
    timestamps: true
});

// Generate Products model
const Products = mongoose.model("products", productSchema);

export default Products;