import mongoose from "mongoose";
const { Schema } = mongoose;

const categorySchema = new Schema(
  {
    name: { type: String },
    description: { type: String },
  },
  { timestamps: false }
);

const Category = mongoose.model("Category", categorySchema);
export default Category;
