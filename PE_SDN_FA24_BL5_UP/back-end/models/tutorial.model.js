import mongoose from "mongoose";
const { Schema } = mongoose;

const imageSchemaEmbedded = new Schema(
  {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Image",
    },
    url: { type: String },
    caption: { type: String },
  },
  {
    timestamps: false,
  },
);

const tutorialSchema = new Schema(
  {
    title: { type: String },
    author: { type: String },
    images: [imageSchemaEmbedded],
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
  },
  {
    timestamps: false,
  },
);

export default mongoose.model("Tutorial", tutorialSchema);
