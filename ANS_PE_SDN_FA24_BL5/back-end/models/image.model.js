//path : back-end/models/image.model.js
import mongoose from "mongoose";
const { Schema } = mongoose;

const imageSchema = new Schema(
  {
    path: { type: String },
    url: { type: String },
    caption: { type: String },
  },
  { timestamps: false, versionKey: false }
);

const Image = mongoose.model("Image", imageSchema);
export default Image;
