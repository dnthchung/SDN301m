const express = require("express");
//morgan: log request
const morgan = require("morgan");
//import router authen
const dishRouter = require("./routes/dish.route");
const authenRouter = require("./routes/authen.route");
const createHttpError = require("http-errors");
//khởi tạo 1 web server : express
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 3000;

//thiết lập các middleware cho web server, "dev" là chỉ áp dụng cho môi trường phát triển, "common" là áp dụng cho môi trường "production
app.use(morgan("dev"));
//thiết lập middleware cho web server để có thể đọc dữ liệu từ body của request cuả client
app.use("/api/auth", authenRouter);
app.use("/dishes", dishRouter);

//kiểm soát các lỗi của request xảy ra trên express server
//truyền vớ vẩn vào thì trả về là lỗi 500 luôn, tránh khi lỗi trả về 1 đống HTML
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
