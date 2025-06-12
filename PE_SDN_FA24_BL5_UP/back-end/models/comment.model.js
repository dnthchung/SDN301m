import mongoose from "mongoose";
const { Schema } = mongoose;

const commentSchema = new Schema(
  {
    username: { type: String },
    text: { type: String },
    createAt: { type: Date },
  },
  {
    timestamps: false,
  },
);
export default mongoose.model("Comment", commentSchema);
