const bodyParser = require("body-parser");
const express = require("express");

const { UserController } = require("../controllers/index.js");
const verifyJWT = require("../middleware/verifyJWT.js");

const userRouter = express.Router();
userRouter.use(bodyParser.json());

//create router
userRouter.post("/create", UserController.create);
userRouter.get("/user/all", UserController.allAccess);
userRouter.get("/user/mod", [verifyJWT.isModerator], UserController.moderatorAccess);

module.exports = userRouter;
