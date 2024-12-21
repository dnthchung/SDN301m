//path : back-end/models/tutorial.model.js
import mongoose from "mongoose";
const { Schema } = mongoose;

const imageSchemaEmbedded = new Schema(
  {
    _id: { type: mongoose.Schema.Types.ObjectId, ref: "Image", required: true },
    url: { type: String, required: true },
    path: { type: String, trim: true },
    caption: { type: String },
    createdAt: { type: Date },
  },
  {
    timestamps: false,
    _id: false,
  }
);

const tutorialSchema = new Schema(
  {
    title: { type: String, trim: true },
    author: { type: String, trim: true },
    images: [imageSchemaEmbedded],
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
