import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import connectDB from "./configs/database.js";
import errorMiddleware from "./middlewares/error.middleware.js";
import loggerMiddleware from "./middlewares/logger.middleware.js";
import todoRoutes from "./routes/todo.route.js";

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

// Custom Logger Middleware
app.use(loggerMiddleware);

// Routes
app.use("/api/todos", todoRoutes);

// Custom Error Middleware
app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
