import mongoose from "mongoose";
const { Schema } = mongoose;

const imageSchema = new Schema(
  {
    path: { type: String, trim: true },
    url: { type: String, trim: true },
    caption: { type: String, trim: true },
    // createdAt: { type: Date },
  },
  {
    timestamps: true,
  }
);

const Image = mongoose.model("Image", imageSchema);
export default Image;
