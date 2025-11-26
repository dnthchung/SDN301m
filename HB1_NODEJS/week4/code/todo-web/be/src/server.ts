import express from "express";
import cors from "cors";
import todoRoutes from "./api/v1/routes/todo.route";
import { requestLogger } from "./api/v1/middlewares/logger.middleware";
import { errorHandler } from "./api/v1/middlewares/error.middleware";

const app = express();
const PORT = 3000;

// 1. Built-in Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 2. Custom Logger Middleware
app.use(requestLogger);

// 3. Routes
app.use("/api/v1/todos", todoRoutes);

// 4. Error Handling Middleware (Phải đặt cuối cùng sau routes)
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
