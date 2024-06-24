const bodyParser = require("body-parser");
const express = require("express");
const verifyJWT = require("../middleware/verifyJWT");

const { UserController } = require("../controllers/index.js");

const userRouter = express.Router();
userRouter.use(bodyParser.json());

//create router
userRouter.post("/create", verifyJWT.verifyTokenIsAdmin, UserController.create);
//get all users
userRouter.get("/", verifyJWT.verifyTokenIsAdmin, UserController.getAll);

module.exports = userRouter;
