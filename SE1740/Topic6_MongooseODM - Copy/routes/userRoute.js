const bodyParser = require("body-parser");
const express = require("express");
const { UserControllers } = require("../controllers/index.js");

const userRouter = express.Router();
userRouter.use(bodyParser.json());

//create router
userRouter.post("/create", UserControllers.create);
//find all
userRouter.get("/all", UserControllers.findAll);

module.exports = userRouter;
