import { Schema } from "mongoose";
import { TodoMessage, UserMessage } from "~/api/v1/constants/messages.constant";
import { ITodo } from "~/api/v1/types/todo.type";

export const todoSchema = new Schema<ITodo>(
  {
    title: { type: String, required: [true, TodoMessage.TITLE_IS_REQUIRED], trim: true, index: true, maxlength: [200, TodoMessage.TITLE_LENGTH_MUST_BE_FROM_3_TO_50] },
    completed: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: [true, UserMessage.USER_ID_IS_REQUIRED] },
  },
  {
    collection: "Todo",
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
    toObject: { virtuals: true },
  },
);
