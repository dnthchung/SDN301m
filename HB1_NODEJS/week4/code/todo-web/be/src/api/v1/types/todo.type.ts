import { Types } from "mongoose";

export interface ITodo {
  _id: Types.ObjectId;
  title: string;
  completed: boolean;
  userId: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}
