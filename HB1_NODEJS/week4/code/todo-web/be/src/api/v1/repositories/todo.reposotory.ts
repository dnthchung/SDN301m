import { Model } from "mongoose";
import { ITodo } from "~/api/v1/types/todo.type";

export class TodoRepository {
  private todoModel: Model<ITodo>;
}
