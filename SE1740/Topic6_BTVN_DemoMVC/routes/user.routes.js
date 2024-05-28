import express from "express";
//import controller from index.js
import { UserController } from "../controllers/index.js";

const userRouter = express.Router();

userRouter.post("/register", UserController.createUser);

export default userRouter;
