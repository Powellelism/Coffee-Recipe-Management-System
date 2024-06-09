const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const storeController = require("../controllers/storeController");
const recipeController = require("../controllers/recipeController");
const aiController = require("../controllers/aiController")

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

router.post(
  "/post/generateRecipe",
  authMiddleware.authenticate,
  aiController.generateRecipe,
);

router.post(
  "/post/generateImage",
  authMiddleware.authenticate,
  aiController.generateImage,
);

router.get(
  "/get/userRecipes",
  authMiddleware.authenticate,
  recipeController.getUserRecipes,
)

module.exports = router;
