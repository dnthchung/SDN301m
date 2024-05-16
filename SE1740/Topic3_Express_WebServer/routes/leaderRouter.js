const bodyParser = require("body-parser");
const express = require("express");
const leaderRouter = express.Router();
const createHttpError = require("http-errors");

leaderRouter.use(bodyParser.json());
//GET id
//localhost:3000/leaders/:leaderId
leaderRouter.get("/:leaderId", (req, res, next) => {
  res.status(200).json({
    message: "GET leader by id",
    leaderId: req.params.leaderId,
  });
});

//localhost:3000/leaders/:leaderId
//Put - update leader by id
leaderRouter.put("/:leaderId", (req, res, next) => {
  res.status(200).json({
    message: "PUT leader by id",
    leaderId: req.params.leaderId,
    body: req.body,
  });
});

//Post - create new leader
//localhost:3000/leaders
leaderRouter.post("/", (req, res, next) => {
  //send back 201 status code and name + age in body
  res.status(201).json({
    message: "POST new leader",
    body: req.body,
  });
});

//Delete by id
//localhost:3000/leaders/:leaderId
leaderRouter.delete("/:leaderId", (req, res, next) => {
  res.status(200).json({
    message: "DELETE leader by id",
    leaderId: req.params.leaderId,
  });
});

// ======== /leaders/:leaderId  =====
//GET id
//localhost:3000/leaders/:leaderId
leaderRouter.get("/leaders/:leaderId", (req, res, next) => {
  res.status(200).json({
    message: "GET leader by id",
    leaderId: req.params.leaderId,
  });
});

//localhost:3000/leaders/:leaderId
//Put - update leader by id
leaderRouter.put("/leaders/:leaderId", (req, res, next) => {
  res.status(200).json({
    message: "PUT leader by id",
    leaderId: req.params.leaderId,
    body: req.body,
  });
});

//Post - create new leader
//localhost:3000/leaders
leaderRouter.post("/leaders", (req, res, next) => {
  //send back 201 status code and name + age in body
  res.status(201).json({
    message: "POST new leader",
    body: req.body,
  });
});

//Delete by id
//localhost:3000/leaders/:leaderId
leaderRouter.delete("/leaders/:leaderId", (req, res, next) => {
  res.status(200).json({
    message: "DELETE leader by id",
    leaderId: req.params.leaderId,
  });
});

// =========== /leadership

module.exports = leaderRouter;
