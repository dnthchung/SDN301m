const express = require("express");
const morgan = require("morgan");
//import router authen
const authenRouter = require("./routes/authen.route");
const dishRouter = require("./routes/dishRouter");
const promoRouter = require("./routes/promoRouter");
const leaderRouter = require("./routes/leaderRouter");
const createHttpError = require("http-errors");

const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 3000;

app.use(morgan("dev"));
app.use("/api/auth", authenRouter);
app.use("/dishes", dishRouter);
app.use("/promotions", promoRouter);
app.use("/leaders", leaderRouter);

//kiểm soát các lỗi của request xảy ra trên express server
app.use(async (req, res, next) => {
  next(createHttpError.NotFound());
});
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  });
});

//khởi động web server ở cổng 3000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
