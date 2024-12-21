//path : back-end/models/category.model.js
import mongoose from "mongoose";
const { Schema } = mongoose;

const categorySchema = new Schema(
  {
    name: { type: String },
    description: { type: String },
  },
  { timestamps: false, versionKey: false }
);

const Category = mongoose.model("Category", categorySchema);
export default Category;
