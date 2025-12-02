"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoRepository = void 0;
const uuid_1 = require("uuid");
const todo_model_1 = require("~/api/v1/models/todo.model");
const AppError_1 = require("~/api/v1/utils/AppError");
class TodoRepository {
    getAllTodos() {
        return todo_model_1.todosDatabase;
    }
    createTodo(title) {
        const newTodo = {
            id: (0, uuid_1.v4)(),
            title,
            completed: false,
            createdAt: new Date(),
        };
        todo_model_1.todosDatabase.push(newTodo);
        return newTodo;
    }
    updateTodo(id, data) {
        const index = todo_model_1.todosDatabase.findIndex((t) => t.id === id);
        if (index === -1) {
            throw new AppError_1.AppError(404, 4041, "Todo not found");
        }
        todo_model_1.todosDatabase[index] = { ...todo_model_1.todosDatabase[index], ...data };
        return todo_model_1.todosDatabase[index];
    }
    deleteTodo(id) {
        const index = todo_model_1.todosDatabase.findIndex((t) => t.id === id);
        if (index === -1) {
            throw new AppError_1.AppError(404, 4041, "Todo not found");
        }
        todo_model_1.todosDatabase.splice(index, 1);
    }
}
exports.TodoRepository = TodoRepository;
