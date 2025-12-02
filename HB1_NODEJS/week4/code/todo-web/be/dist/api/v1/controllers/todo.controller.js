"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoController = void 0;
const todo_service_1 = require("~/api/v1/services/todo.service");
const todo_validation_1 = require("~/api/v1/validations/todo.validation");
const response_util_1 = require("~/api/v1/utils/response.util");
class TodoController {
    todoService;
    constructor() {
        this.todoService = new todo_service_1.TodoService();
    }
    // GET ALL TODOS
    getTodos = (req, res, next) => {
        try {
            const todos = this.todoService.getAllTodos();
            new response_util_1.SuccessResponse('Get list OK', 200, todos).send(res);
        }
        catch (error) {
            next(error);
        }
    };
    // CREATE TODO
    createTodo = async (req, res, next) => {
        try {
            const validated = await todo_validation_1.createTodoSchema.parseAsync({ body: req.body });
            const todo = this.todoService.createTodo(validated.body.title);
            new response_util_1.SuccessResponse('Created OK', 201, todo).send(res);
        }
        catch (error) {
            next(error);
        }
    };
    // UPDATE TODO
    updateTodo = async (req, res, next) => {
        try {
            const validated = await todo_validation_1.updateTodoSchema.parseAsync({
                body: req.body,
                params: req.params,
            });
            const updatedTodo = this.todoService.updateTodo(validated.params.id, validated.body);
            new response_util_1.SuccessResponse('Updated OK', 200, updatedTodo).send(res);
        }
        catch (error) {
            next(error);
        }
    };
    // DELETE TODO
    deleteTodo = (req, res, next) => {
        try {
            const { id } = req.params;
            this.todoService.deleteTodo(id);
            new response_util_1.SuccessResponse('Deleted OK', 200).send(res);
        }
        catch (error) {
            next(error);
        }
    };
}
exports.TodoController = TodoController;
