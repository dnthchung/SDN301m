import { Todo, todosDatabase } from "~/api/v1/models/todo.model";
import { AppError } from "~/api/v1/utils/AppError";
import { v4 as uuidv4 } from "uuid";

export class TodoService {
  // GET ALL TODOS
  static getAllTodos(): Todo[] {
    return todosDatabase;
  }

  // CREATE TODO
  static createTodo(title: string): Todo {
    const newTodo: Todo = {
      id: uuidv4(),
      title,
      completed: false,
      createdAt: new Date(),
    };
    todosDatabase.push(newTodo);
    return newTodo;
  }

  // UPDATE TODO
  static updateTodo(id: string, data: Partial<Todo>): Todo {
    const index = todosDatabase.findIndex((t) => t.id === id);
    if (index === -1) {
      throw new AppError(404, 4041, "Todo not found");
    }

    todosDatabase[index] = { ...todosDatabase[index], ...data };
    return todosDatabase[index];
  }

  // DELETE TODO
  static deleteTodo(id: string): void {
    const index = todosDatabase.findIndex((t) => t.id === id);
    if (index === -1) {
      throw new AppError(404, 4041, "Todo not found");
    }

    todosDatabase.splice(index, 1);
  }
}
