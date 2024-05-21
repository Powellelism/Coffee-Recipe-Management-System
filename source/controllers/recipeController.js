const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

/**
 * This function retrieves the recipes with their associated data.
 * @param request
 * @param response
 * @returns {Promise<void>}
 */
exports.getRecipes = async (request, response) => {
  try {
    const recipes = await prisma.recipe.findMany({
      include: {
        food: {
          select: {
            name: true,
            description: true,
            price: true,
            store: {
              select: {
                name: true,
              },
            },
            type: true,
            size: true,
          },
        },
        ingredients: {
          select: {
            name: true,
          },
        },
        ratings: {
          select: {
            score: true,
          },
        },
        reviews: {
          select: {
            content: true,
          },
        },
      },
      orderBy: {
        name: "asc",
      },
    });

    const formattedRecipes = recipes.map((recipe) => ({
      recipeName: recipe.name,
      description: recipe.description,
      food: {
        name: recipe.food.name,
        description: recipe.food.description,
        price: recipe.food.price,
        store: recipe.food.store.name,
        type: recipe.food.type,
        size: recipe.food.size,
      },
      ingredients: recipe.ingredients.map((ingredient) => ingredient.name),
      size: recipe.size,
      ratings: recipe.ratings.map((rating) => rating.score),
      reviews: recipe.reviews.map((review) => review.content),
      instructions: recipe.instructions,
      totalTime: recipe.totalTime,
    }));

    response.json(formattedRecipes);
  } catch (error) {
    console.error("Error retrieving recipes:", error);
    response.status(500).json({ error: "Internal Server Error" });
  }
};