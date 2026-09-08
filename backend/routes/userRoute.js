const express = require("express");

const router = express.Router();

const wrapAsync = require("../utils/wrapAsync.js");
const userController = require("../controllers/userController.js");
const authMiddleware = require("../middlewares/authMiddleware.js");

// Register
router.post("/register", wrapAsync(userController.register));

// Login
router.post("/login", wrapAsync(userController.login));

// Logout
router.post("/logout", wrapAsync(userController.logout));

// Current user
router.get("/me", authMiddleware, wrapAsync(userController.getCurrentUser));

module.exports = router;

