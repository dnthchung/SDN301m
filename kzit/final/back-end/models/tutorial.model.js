import mongoose from "mongoose";
const { Schema } = mongoose;

const tutorialSchema = new Schema(
  {
    title: { type: String, trim: true },
    author: { type: String, trim: true },
    images: [
      {
        type: Schema.Types.ObjectId,
        ref: "Image",
      },
    ],
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
    },
  },
  { timestamps: false }
);

const Tutorial = mongoose.model("Tutorial", tutorialSchema);
export default Tutorial;
