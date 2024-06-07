const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const storeController = require("../controllers/storeController");
const recipeController = require("../controllers/recipeController");

router.get("/get/shops", authMiddleware.authenticate, storeController.getShops);

router.post(
  "/post/recipe",
  authMiddleware.authenticate,
  recipeController.addRecipe,
);

router.get(
  "/get/ratingrecipes",
  authMiddleware.authenticate,
  recipeController.getRatingRecipes,
);

router.get(
  "/get/recentrecipes",
  authMiddleware.authenticate,
  recipeController.getRecentRecipes,
);

router.put(
  "/update/recipe/:id",
  authMiddleware.authenticate,
  recipeController.updateRecipe,
);

router.get(
  "/get/recipe/:id",
  authMiddleware.authenticate,
  recipeController.getSingleRecipe,
);

router.get(
  "/get/recipe/:id/rating",
  authMiddleware.authenticate,
  recipeController.getRatingForRecipe,
);

router.put(
  "/update/recipe/:id/rating",
  authMiddleware.authenticate,
  recipeController.updateRecipeRating,
);

module.exports = router;
