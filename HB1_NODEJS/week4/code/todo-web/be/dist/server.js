"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const todo_route_1 = __importDefault(require("./api/v1/routes/todo.route"));
const logger_middleware_1 = require("./api/v1/middlewares/logger.middleware");
const error_middleware_1 = require("./api/v1/middlewares/error.middleware");
const app = (0, express_1.default)();
const PORT = 3000;
// 1. Built-in Middlewares
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// 2. Custom Logger Middleware
app.use(logger_middleware_1.requestLogger);
// 3. Routes
app.use("/api/v1/todos", todo_route_1.default);
// 4. Error Handling Middleware (Phải đặt cuối cùng sau routes)
app.use(error_middleware_1.errorHandler);
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
