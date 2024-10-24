const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const httpError = require("http-errors");
const db = require("./models");
////=============================1. Phải import routes===================
const { movieRouter } = require("./routes");

//============================================================================

require("dotenv").config();

const app = express();
app.use(morgan("dev"));
app.use(bodyParser.json());

//====================2. để ý là mẫu họ đòi URL trông ntn ==================
app.use("/api/movie", movieRouter);

//============================================================================

// error handle = thằng ni phải để cuối cùng nha nếu không mọi api khi gọi đến đều sẽ 404
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
