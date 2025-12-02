"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoService = void 0;
const todo_repository_1 = require("~/api/v1/repositories/todo.repository");
class TodoService {
    todoRepository;
    constructor() {
        this.todoRepository = new todo_repository_1.TodoRepository();
    }
    // GET ALL TODOS
    getAllTodos() {
        return this.todoRepository.getAllTodos();
    }
    // CREATE TODO
    createTodo(title) {
        return this.todoRepository.createTodo(title);
    }
    // UPDATE TODO
    updateTodo(id, data) {
        return this.todoRepository.updateTodo(id, data);
    }
    // DELETE TODO
    deleteTodo(id) {
        this.todoRepository.deleteTodo(id);
    }
}
exports.TodoService = TodoService;
