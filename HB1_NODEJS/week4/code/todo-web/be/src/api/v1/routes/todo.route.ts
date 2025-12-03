import { Router } from "express";
import * as todoController from "../controllers/todo.controller";
import { requireAuth, checkTodoOwner } from "../middlewares/auth.middleware";

const router = Router();

router.use(requireAuth); // All todo routes require auth

router.get("/my", todoController.getMyTodos);
router.post("/", todoController.createTodo);

router.get("/:id", checkTodoOwner, todoController.getTodoById);
router.put("/:id", checkTodoOwner, todoController.updateTodo);
router.delete("/:id", checkTodoOwner, todoController.deleteTodo);
router.patch("/:id/toggle", checkTodoOwner, todoController.toggleStatus);

export default router;
