import { Router } from "express";
import { UserController } from "~/api/v1/controllers/user.controller";

const router = Router();
const userController = new UserController();

router.post("/login", userController.login);
router.get("/", userController.getAllUsers);
router.get("/:id", userController.getUserById);
router.post("/", userController.createUser);
router.patch("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);

export default router;
