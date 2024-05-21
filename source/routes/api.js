const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const storeController = require("../controllers/storeController");
const recipeController = require("../controllers/recipeController");

router.get("/get/shops", authMiddleware.authenticate, storeController.getShops);

router.post("/post/recipe", authMiddleware.authenticate, recipeController.addRecipe);
router.get("/get/recipes", authMiddleware.authenticate, recipeController.getRecipes);

module.exports = router;
