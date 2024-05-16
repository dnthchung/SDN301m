const bodyParser = require("body-parser");
const express = require("express");
const dishRouter = express.Router();
const createHttpError = require("http-errors");

dishRouter.use(bodyParser.json());

//GET id
//localhost:3000/dishes/:dishId
dishRouter.get("/:dishId", (req, res, next) => {
  //back 1 object + 1 status code
  res.status(200).json({
    message: "GET dish by id",
    dishId: req.params.dishId,
  });
});

//Put
//update dishes by id
dishRouter.put("/:dishId", (req, res, next) => {
  res.status(200).json({
    message: "PUT dish by id",
    dishId: req.params.dishId,
    body: req.body,
  });
});

//Post
//create new dishes
dishRouter.post("/", (req, res, next) => {
  res.status(201).json({
    message: "POST new dish",
    body: req.body,
  });
});

//Delete by id
dishRouter.delete("/:dishId", (req, res, next) => {
  res.status(200).json({
    message: "DELETE dish by id",
    dishId: req.params.dishId,
  });
});

module.exports = dishRouter;
