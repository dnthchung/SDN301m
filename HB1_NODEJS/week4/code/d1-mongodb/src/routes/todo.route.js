import express from "express";
import { createTodo, deleteTodo, getTodos, updateTodo } from "../controllers/todo.controller.js";
import validate from "../middlewares/validate.middleware.js";
import { createTodoSchema, updateTodoSchema } from "../validations/todo.validation.js";

const router = express.Router();

router.get("/", getTodos);
router.post("/", validate(createTodoSchema), createTodo);
router.patch("/:id", validate(updateTodoSchema), updateTodo);
router.delete("/:id", deleteTodo);

export default router;
