import { Request, Response, NextFunction } from "express";
import { TodoService } from "~/api/v1/services/todo.service";
import { createTodoSchema, updateTodoSchema } from "~/api/v1/validations/todo.validation";

export class TodoController {
  // GET ALL TODOS
  static getTodos = (req: Request, res: Response, next: NextFunction) => {
    try {
      const todos = TodoService.getAllTodos();
      res.status(200).json({
        success: true,
        message: "Get list OK",
        data: todos,
      });
    } catch (error) {
      next(error);
    }
  };

  // CREATE TODO
  static createTodo = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const validated = await createTodoSchema.parseAsync({ body: req.body });

      const todo = TodoService.createTodo(validated.body.title);
      res.status(201).json({
        success: true,
        message: "Created OK",
        data: todo,
      });
    } catch (error) {
      next(error);
    }
  };

  // UPDATE TODO
  static updateTodo = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const validated = await updateTodoSchema.parseAsync({
        body: req.body,
        params: req.params,
      });

      const updatedTodo = TodoService.updateTodo(validated.params.id, validated.body);
      res.status(200).json({
        success: true,
        message: "Updated OK",
        data: updatedTodo,
      });
    } catch (error) {
      next(error);
    }
  };

  // DELETE TODO
  static deleteTodo = (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      TodoService.deleteTodo(id);
      res.status(200).json({
        success: true,
        message: "Deleted OK",
      });
    } catch (error) {
      next(error);
    }
  };
}
