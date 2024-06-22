const express = require("express");
const userController = require("../controllers/userController");
const verifyJWT = require("../middlewares/verifyJWT");
const router = express.Router();

router.get("/", verifyJWT.verifyToken, userController.getAllUsers);
router.get("/:id", userController.getUserById);
router.delete("/:id", verifyJWT.verifyTokenAndAdmin, userController.deleteUser);

module.exports = router;
