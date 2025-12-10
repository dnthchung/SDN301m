import Todo, { ITodo } from "~/api/v1/models/todo.model";

export class TodoRepository {
  async getAllTodos(userId: string, search?: string): Promise<ITodo[]> {
    const query: any = { ownerId: userId };
    if (search) {
      query.title = { $regex: search, $options: "i" };
    }
    return await Todo.find(query);
  }

  async createTodo(title: string, userId: string): Promise<ITodo> {
    return await Todo.create({ title, ownerId: userId });
  }

  async updateTodo(id: string, data: Partial<ITodo>): Promise<ITodo | null> {
    return await Todo.findOneAndUpdate({ _id: id }, data, { new: true });
  }

  async deleteTodo(id: string): Promise<ITodo | null> {
    return await Todo.findOneAndDelete({ _id: id });
  }
}
