const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const httpErrors = require("http-errors");
const db = require("./models");
const { UserRouter, AuthRouter } = require("./routes");

require("dotenv").config();

// Khoi tao Express web server
const app = express();
// Bo sung middlewares kiem soat hoat dong tren Express web server
app.use(morgan("dev"));
app.use(bodyParser.json());

// Dinh tuyen 1 root router
app.get("/", (req, res, next) => {
    res.status(200).json({
        message: "Welcome to RESTFul API - NodeJS"
    });
});

app.use("/api/user", UserRouter);
app.use("/api/auth", AuthRouter);

// Kiem soat cac loi xay ra tren Express server
app.use(async (req, res, next)=>{
    next(httpErrors.NotFound());
});
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.send({
        "status": err.status || 500,
        "message": err.message
    });
});

// Tiep nhan cac requests toi Express web server
app.listen(process.env.PORT, process.env.HOST_NAME, () => {
    console.log(`Server is running at: http://${process.env.HOST_NAME}:${process.env.PORT}`);
    // Connect to DB
    db.connectDB();
});