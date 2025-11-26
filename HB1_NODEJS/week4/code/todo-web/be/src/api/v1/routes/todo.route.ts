import { Router } from "express";
import { TodoController } from "~/api/v1/controllers/todo.controller";

const router = Router();

router.get("/", TodoController.getTodos);
router.post("/", TodoController.createTodo);
router.patch("/:id", TodoController.updateTodo);
router.delete("/:id", TodoController.deleteTodo);

export default router;
