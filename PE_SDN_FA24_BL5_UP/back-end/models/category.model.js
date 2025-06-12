import mongoose from "mongoose";
const { Schema } = mongoose;

const categorySchema = new Schema(
  {
    name: { type: String },
    description: { type: String },
  },
  {
    timestamps: false,
  },
);
export default mongoose.model("Category", categorySchema);
