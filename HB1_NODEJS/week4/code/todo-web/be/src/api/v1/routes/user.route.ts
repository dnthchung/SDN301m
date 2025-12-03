import { Router } from "express";
import * as userController from "../controllers/user.controller";
import { requireAuth, requireRole } from "../middlewares/auth.middleware";

const router = Router();

// Admin routes
router.get("/admin/users", requireAuth, requireRole("admin"), userController.getAllUsers);
router.delete("/admin/users/:id", requireAuth, requireRole("admin"), userController.deleteUser);

// User routes
router.put("/users/profile", requireAuth, userController.updateProfile);

export default router;
