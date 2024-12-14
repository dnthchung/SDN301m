import mongoose from "mongoose";
const { Schema } = mongoose;

const commentSchema = new Schema(
  {
    username: { type: String },
    text: { type: String },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: false }
);

const Comment = mongoose.model("Comment", commentSchema);

export default Comment;
