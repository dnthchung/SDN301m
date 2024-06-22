// const authController = require("../controllers/authController");
// const router = require("express").Router();

// router.get("/register", authController.register);

// module.exports = router;
const express = require("express");
const authController = require("../controllers/authController");
const middleware = require("../middlewares/verifyJWT");
const router = express.Router();

router.post("/register", authController.register);
router.post("/login", authController.loginUser);
router.post("/logout", middleware.verifyToken, authController.logoutUser); //user must login to logout
//refresh token
router.post("/refresh", authController.requestRefreshToken);

module.exports = router;
