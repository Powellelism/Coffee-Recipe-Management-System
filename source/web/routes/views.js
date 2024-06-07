const express = require("express");
const path = require("path");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

// Serve index view
router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public", "index.html"));
});

// Serve about us view
router.get("/about", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/pages", "about.html"));
});

// Serve login view
router.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/pages", "auth/login.html"));
});

// Serve register view
router.get("/register", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/pages", "auth/register.html"));
});

// Serve forgot password view
router.get("/forgot", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/pages", "auth/forgot.html"));
});

// ------- Authenticated Views
// Serve dashboard view
router.get("/dashboard", authMiddleware.authenticate, (req, res) => {
  res.sendFile(path.join(__dirname, "../public/pages", "dashboard.html"));
});


// serve recipe customization view
router.get("/recipe/customize", authMiddleware.authenticate, (req, res) => {
  res.sendFile(path.join(__dirname, "../public/pages", "customizeRecipe.html"));
});

// serve recipe review view
router.get("/recipe/review", authMiddleware.authenticate, (req, res) => {
  res.sendFile(path.join(__dirname, "../public/pages", "reviewRecipe.html"));
});
module.exports = router;
