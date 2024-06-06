const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const httpError = require("http-errors");
const db = require("./models");
const {
  userRouter,
  roleRouter,
  leaderRouter,
  personRouter,
  storyRouter,
} = require("./routes");
require("dotenv").config();

const app = express();
app.use(morgan("dev"));
app.use(bodyParser.json());

app.get("/", (req, res, next) => {
  res.status(200).json({ message: "Welcome to SE1740" });
});
app.use("/user", userRouter);
app.use("/role", roleRouter);
app.use("/leader", leaderRouter);
//lab2
app.use("/api/person", personRouter);
app.use("/api/story", storyRouter);

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
      and at : https://${process.env.HOST_NAME}:${process.env.PORT}`
  );
  db.connectDB();
});
