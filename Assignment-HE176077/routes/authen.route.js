const bodyParser = require("body-parser");
const express = require("express");
const authenRouter = express.Router();
const createHttpError = require("http-errors");

//sử dụng body-parser để parse dữ liệu từ client gửi lên
authenRouter.use(bodyParser.json());

//1. Register
authenRouter.post("/register", (req, res, next) => {
  const { username, password } = req.body;
  console.log(username);
  console.log(password);

  res.status(200).json({
    message: "Register successfully",
    email: req.body.email,
    password: req.body.password,
    fullName: req.body.fullName + " " + req.body.lastName,
    role: req.body.role,
  });
});

//2. Login
//localhost:9999/api/auth/login
//Json : {email: "abc", password: "123" }
authenRouter.post("/login", (req, res, next) => {
  res.status(200).json({
    message: "Login successfully",
    email: req.body.email,
    password: req.body.password,
  });
});

//3. change profile || update profile
//localhost:9999/api/auth/profile/123
//json : {}
authenRouter.put("/profile/:accId", (req, res, next) => {
  const accId = req.params.accId;
  res.status(200).json({
    //accId ở mess này là accId đã được khai báo ở trên, ocnf không thì là req.params.accId
    message: `Update profile ${accId} successfully`,
    data: {
      id: accId,
      email: req.body.email,
      fullName: req.body.fullName,
      lastName: req.body.lastName,
    },
  });
});

authenRouter.put("/profile2/:accId2", (req, res, next) => {
  //check accId2
  //Các lỗi này liên quan đến vấn đề validation, nếu không phải là số thì trả về lỗi 400
  if (isNaN(req.body.phoneNumber.bodyParser)) {
    next(createHttpError.BadRequest("Phone number is not a number"));
  }

  res.status(200).json({
    message: `Update profile ${req.params.accId2} successfully`,
    data: {
      id: req.params.accId2,
      email: req.body.email,
      fullName: req.body.fullName,
      lastName: req.body.lastName,
      phoneNumber: req.body.phoneNumber,
    },
  });
});

module.exports = authenRouter;
