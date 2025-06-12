import mongoose from "mongoose";
const { Schema } = mongoose;

const imageSchema = new Schema(
  {
    path: { type: String },
    url: { type: String },
    caption: { type: String },
    createAt: { type: Date },
  },
  {
    timestamps: false,
  },
);
export default mongoose.model("Image", imageSchema);
