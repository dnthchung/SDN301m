import { NextFunction, Request, Response } from "express";
import { TodoService } from "~/api/v1/services/todo.service";
import { createTodoSchema, updateTodoSchema } from "~/api/v1/validations/todo.validation";
import { SuccessResponse, UnauthorizedError } from '~/api/v1/utils/response.util'

export class TodoController {
  private todoService: TodoService;

  constructor() {
    this.todoService = new TodoService();
  }

  // GET ALL TODOS
  getTodos = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.headers["x-user-id"] as string;
      if (!userId) {
        throw new UnauthorizedError("User ID is required");
      }
      const todos = await this.todoService.getAllTodos(userId);
      new SuccessResponse('Get list OK', 200, todos).send(res);
    } catch (error) {
      next(error);
    }
  };

  // CREATE TODO
  createTodo = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.headers["x-user-id"] as string;
      if (!userId) {
        throw new UnauthorizedError("User ID is required");
      }
      const validated = await createTodoSchema.parseAsync({ body: req.body });

      const todo = await this.todoService.createTodo(validated.body.title, userId);
      new SuccessResponse('Created OK', 201, todo).send(res);
    } catch (error) {
      next(error);
    }
  };

  // UPDATE TODO
  updateTodo = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const validated = await updateTodoSchema.parseAsync({
        body: req.body,
        params: req.params,
      });

      const updatedTodo = await this.todoService.updateTodo(validated.params.id, validated.body);
      new SuccessResponse('Updated OK', 200, updatedTodo).send(res);
    } catch (error) {
      next(error);
    }
  };

  // DELETE TODO
  deleteTodo = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      await this.todoService.deleteTodo(id);
      new SuccessResponse('Deleted OK', 200).send(res);
    } catch (error) {
      next(error);
    }
  };
}
