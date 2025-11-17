import express from "express";
import bookRoutes from "./routes/book.route.js";

const app = express();

app.use(express.json());
app.use("/api/books", bookRoutes);

app.use((req, res, next) => {
  res.status(404).json({
    status: "error",
    message: "Route not found",
  });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    status: "error",
    message: "Internal Server Error",
  });
});

export default app;
