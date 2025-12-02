import { Router } from "express";
import { TodoController } from "~/api/v1/controllers/todo.controller";

const router = Router();
const todoController = new TodoController();

router.get("/", todoController.getTodos);
router.post("/", todoController.createTodo);
router.patch("/:id", todoController.updateTodo);
router.delete("/:id", todoController.deleteTodo);

export default router;
