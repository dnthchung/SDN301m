import { Todo } from "~/api/v1/models/todo.model";
import { ITodo } from "~/api/v1/types/todo.type";

export class TodoRepository {
    async getAllTodos(userId: string, search?: string): Promise<ITodo[]> {
        const query: any = { userId };
        if (search) {
            query.title = { $regex: search, $options: "i" };
        }
        return await Todo.find(query);
    }

    async createTodo(title: string, userId: string): Promise<ITodo> {
        return await Todo.create({ title, userId });
    }

    async updateTodo(id: string, data: Partial<ITodo>): Promise<ITodo | null> {
        return await Todo.findOneAndUpdate({ _id: id }, data, { new: true });
    }

    async deleteTodo(id: string): Promise<ITodo | null> {
        return await Todo.findOneAndDelete({ _id: id });
    }
}
