const express = require("express");
const app = express();

const requestLogger = require("./middlewares/requestLogger");
const errorHandler = require("./middlewares/errorHandler");
const ApiError = require("./utils/ApiError");
const booksRouter = require("./routes/books");

const PORT = 3000;

app.use(express.json());
app.use(requestLogger);

app.use("/api/books", booksRouter);
app.use((req, res, next) => {
  next(new ApiError(404, 404, "Route not found"));
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server đang chạy tại http://localhost:${PORT}`);
});
