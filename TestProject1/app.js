var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

//add mongoose and cors
var cors = require("cors");
const mongoose = require("mongoose");

//router
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var productRouter = require("./routes/productRouter");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
//middleware to read json from body
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

//use cors
app.use(cors(corsOptionsDelegate));
var corsOptionsDelegate = function (req, callback) {
  var corsOptions = { origin: true };
  callback(null, corsOptions);
};

// dùng để xử lý các request đến root của ứng dụng
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/product", productRouter);

//connect to mongodb
mongoose
  .connect("mongodb://localhost:27017/TestProject1", {})
  .then(() => {
    console.log("=============| Connected to the database!");
  })
  .catch((err) => {
    console.log("=============| Cannot connect to the database!", err);
  });

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;