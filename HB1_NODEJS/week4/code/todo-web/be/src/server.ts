import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import todoRoutes from "./api/v1/routes/todo.route";
import userRoutes from "./api/v1/routes/user.route";
import authRoutes from "./api/v1/routes/auth.route";
import { requestLogger } from "./api/v1/middlewares/logger.middleware";
import { errorHandler } from "./api/v1/middlewares/error.middleware";
import { deserializeUser } from "./api/v1/middlewares/auth.middleware";
import connectRepo from "./api/v1/db/init.mongodb";

const app = express();
const PORT = 3000;

// Connect to DB
connectRepo();

// 1. Built-in Middlewares
app.use(
  cors({
    origin: true, // Allow all for now
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// 2. Custom Logger Middleware
app.use(requestLogger);

// 3. Auth Middleware
app.use(deserializeUser);

// 4. Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/todos", todoRoutes);
app.use("/api/v1", userRoutes); // Mount at /api/v1 to support /api/v1/admin/users

// 5. Error Handling Middleware
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
