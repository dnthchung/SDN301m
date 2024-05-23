const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

const app = express();

app.use(cors(corsOptionsDelegate));
app.use(cookieParser());
app.use(express.json());

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

app.listen(8000, () => {
  console.log("Server is running on port 5000");
});
