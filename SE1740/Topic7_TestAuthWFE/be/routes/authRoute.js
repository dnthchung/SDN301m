const express = require("express");
const bodyParser = require("body-parser");
const { AuthController } = require("../controllers/index.js");
const verifySignUp = require("../middleware/verifySignUp");

const authRouter = express.Router();
authRouter.use(bodyParser.json());

//sign up
authRouter.post("/signup", [verifySignUp.checkExistRole, verifySignUp.checkExistUser], AuthController.signup);
//sign in
authRouter.post("/signin", AuthController.signin);

//refresh token
authRouter.post("/refresh", AuthController.requestRefreshToken2);

module.exports = authRouter;
