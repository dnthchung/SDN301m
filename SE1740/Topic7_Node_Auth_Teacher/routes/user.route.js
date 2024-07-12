const bodyParser = require("body-parser");
const express = require("express");
const { UserController } = require("../controllers");
const verifyJWT = require("../middlewares/verifyJwt");

const userRouter = express.Router();
userRouter.use(bodyParser.json());

userRouter.get("/all", UserController.allAccess);
userRouter.get("/member", [verifyJWT.verifyToken] ,UserController.memberAccess);
userRouter.get("/mod", [verifyJWT.verifyToken, verifyJWT.isModerator] ,UserController.modAccess);
userRouter.get("/admin", [verifyJWT.verifyToken, verifyJWT.isAdministrator] ,UserController.adminAccess);

module.exports = userRouter;