import express from "express";
//import controller from index.js
import { UserController } from "../controllers/index.js";

const userRouter = express.Router();

userRouter.post("/register", UserController.createUser);
userRouter.get("/all", UserController.getAllUsers);
userRouter.get("/:id", UserController.getAnUserById);
userRouter.put("/:id", UserController.updateUserById);

export default userRouter;
