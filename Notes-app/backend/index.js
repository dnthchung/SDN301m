const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

app.use(express.json());

app.use(
  cors({
    origin: "*", // restrict calls to those this address
  })
);

app.get("/", (req, res) => {
  res.json({ message: "Hello World" });
});

app.listen(8000);

module.exports = app;
