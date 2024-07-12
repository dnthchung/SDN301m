const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const httpError = require("http-errors");
const cors = require("cors");
const db = require("./models");
const { userRouter, authRouter, employeeRoute, departmentRoute, projectRoute } = require("./routes");
require("dotenv").config();

const app = express();

// CORS configuration
const corsOptions = {
  origin: ["http://localhost:3000", "http://localhost:9999"],
  optionsSuccessStatus: 200, // Some legacy browsers choke on 204
};

app.use(cors(corsOptions));
app.use(morgan("dev"));
app.use(bodyParser.json());

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/projects", projectRoute);
app.use("/employees", employeeRoute);
app.use("/departments", departmentRoute);

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
