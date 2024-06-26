var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");

//mongoose
const mongoose = require("mongoose");
require("./models/productModel");
//...

//router
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var productRouter = require("./routes/product");

var productAPIRouter = require("./routes/productAPI");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

//connect to mongodb
//"mongodb://127.0.0.1:27017/HE176077"
mongoose
  .connect("mongodb://localhost:27017/HE176077", {})
  .then(() => {
    console.log("=============| Connected to the database!");
  })
  .catch((err) => {
    console.log("=============| Cannot connect to the database!", err);
  });

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
//use cors
app.use(cors(corsOptionsDelegate));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/sanpham", productRouter); // Add this line
app.use("/product-api", productAPIRouter); // Add this line

// cors
var corsOptionsDelegate = function (req, callback) {
  var corsOptions = { origin: true };
  callback(null, corsOptions);
};

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
