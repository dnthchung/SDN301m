import mongoose, { Schema } from "mongoose";

const categorySchema = new Schema({
    name: {
        type: String,
        require: true,
        unique: true
    },
    description:{
        type: String,
    }
},
{
    timestamps: true
});

const Categories = mongoose.model("categories", categorySchema);

export default Categories;