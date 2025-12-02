import { ITodo } from "~/api/v1/types/todo.type";
import { TodoRepository } from "~/api/v1/repositories/todo.repository";

export class TodoService {
  private todoRepository: TodoRepository;

  constructor() {
    this.todoRepository = new TodoRepository();
  }

  // GET ALL TODOS
  async getAllTodos(userId: string, search?: string): Promise<ITodo[]> {
    return await this.todoRepository.getAllTodos(userId, search);
  }

  // CREATE TODO
  async createTodo(title: string, userId: string): Promise<ITodo> {
    return await this.todoRepository.createTodo(title, userId);
  }

  // UPDATE TODO
  async updateTodo(id: string, data: Partial<ITodo>): Promise<ITodo | null> {
    return await this.todoRepository.updateTodo(id, data);
  }

  // DELETE TODO
  async deleteTodo(id: string): Promise<ITodo | null> {
    return await this.todoRepository.deleteTodo(id);
  }
}
