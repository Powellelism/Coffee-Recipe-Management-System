const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/login", authMiddleware.authenticate, authController.login);
router.post("/register", authMiddleware.authenticate, authController.register);

router.use(authMiddleware.authenticate);

module.exports = router;
