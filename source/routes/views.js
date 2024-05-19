const express = require("express");
const path = require("path");
const router = express.Router();

// Serve index view
router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/templates", "index.html"));
});

// Serve about us view
router.get("/about", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/templates", "about.html"));
});

// Serve login view
router.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/templates", "auth/login.html"));
});

// Serve register view
router.get("/register", (req, res) => {
  res.sendFile(
    path.join(__dirname, "../public/templates", "auth/register.html"),
  );
});

// Serve forgot password view
router.get("/forgot", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/templates", "auth/forgot.html"));
});

// Serve common home view
router.get("/common/home", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/templates", "common.html"));
});

// Serve dashboard view
router.get("/dashboard", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/templates", "dashboard.html"));
});
// serve preset customize view
router.get("/preset/customize", (req, res) => {
  res.sendFile(
    path.join(__dirname, "../public/templates", "presetCustomize.html"),
  );
});

// serve preset list view
router.get("/preset/list", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/templates", "presetList.html"));
});

// serve recipe customization view
router.get("/recipe/customize", (req, res) => {
  res.sendFile(
    path.join(__dirname, "../public/templates", "customizeRecipe2.html"),
  );
});

// serve saved recipe view
router.get("/recipe/saved", (req, res) => {
  res.sendFile(
    path.join(__dirname, "../public/templates", "savedRecipes.html"),
  );
});

// serve recipe review view
router.get("/recipe/review", (req, res) => {
  res.sendFile(
    path.join(__dirname, "../public/templates", "reviewRecipe2.html"),
  );
});
module.exports = router;
