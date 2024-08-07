const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const httpError = require("http-errors");
const db = require("./models");
const { userRouter, roleRouter, authRouter } = require("./routes");
require("dotenv").config();

const app = express();

// CORS configuration
const corsOptions = {
  origin: "http://localhost:5173", // Your front-end URL
  credentials: true, // Allow credentials (cookies, authorization headers)
};

app.use(cors(corsOptions));
app.use(morgan("dev"));
app.use(cookieParser());
app.use(bodyParser.json());

app.use("/api/user", userRouter);
app.use("/api/role", roleRouter);
app.use("/api/auth", authRouter);

app.use(async (req, res, next) => {
  next(httpError.NotFound());
});
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.send({
    error: {
      status: error.status || 500,
      message: error.message,
    },
  });
});

app.listen(process.env.PORT, process.env.HOST_NAME, () => {
  console.log(
    `Server is running on port ${process.env.PORT} 
      and at : https://${process.env.HOST_NAME}:${process.env.PORT}`,
  );
  db.connectDB();
});
