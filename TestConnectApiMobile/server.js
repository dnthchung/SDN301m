const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const httpError = require("http-errors");
const db = require("./models");

// Import your routes here
// const { cakeRouter, toppingRouter, optionRouter } = require("./routes");

require("dotenv").config();

const app = express();
app.use(morgan("dev"));
app.use(bodyParser.json());

// ========================================================================
// Simple GET API for testing
app.get("/api/test", (req, res) => {
  res.json({
    message: "API is working ne 123!",
    success: true,
  });
});

// POST API to receive a string
app.post("/api/login", (req, res) => {
  const userNameInput = req.body.userName;
  const passwordInput = req.body.password;

  //account role admin
  const adminName = "admin";
  const adminPassword = "123";
  const adminRole = "admin";

  //account role user
  const userName = "user";
  const userPassword = "123";
  const userRole = "user";

  if (userNameInput === adminName && passwordInput === adminPassword) {
    res.json({
      message: "Login success!",
      role: adminRole,
      success: true,
      data: adminName,
    });
  }
  if (userNameInput === userName && passwordInput === userPassword) {
    res.json({
      message: "Login success!",
      role: userRole,
      success: true,
      data: userName,
    });
  } else {
    res.json({
      message: "Login failed!",
      success: false,
    });
  }
});

// ========================================================================

// Error handling
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
