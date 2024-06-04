const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const httpError = require("http-errors");
const db = require("./models");
const { userRouter } = require("./routes");
require("dotenv").config();

//khoi tao express web server
const app = express();
//giam sat cac request gui den servers
app.use(morgan("dev"));
app.use(bodyParser.json());

// dịnh tuyến các router để cho các ứng dụng client gọi tới
app.get("/", (req, res, next) => {
  res.status(200).json({ message: "Welcome to SE1740" });
});

app.use("/user", userRouter);

//kiem soat loi
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
//tiếp nhận các request gửi đến từ client tới web server
app.listen(process.env.PORT, process.env.HOST_NAME, () => {
  console.log(
    `Server is running on port ${process.env.PORT} 
    and at : https://${process.env.HOST_NAME}:${process.env.PORT}`
  );

  //kết nối đến CSDL MongoDB
  db.connectDB();
});
