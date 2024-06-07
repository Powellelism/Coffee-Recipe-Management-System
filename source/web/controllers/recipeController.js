const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

/**
 * This function retrieves the recipes based on descending rating.
 * @param request None
 * @param response return a list of recipes in descending rating. 
 * Recipe is in json file including name, description, food, ingredients, size, rating, reviews, instructions, totalTime)
 * @returns {Promise<void>}
 */
exports.getRatingRecipes = async (request, response) => {
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
        reviews: {
          select: {
            content: true,
          },
        },
      },
      orderBy: {
        rating: "desc",
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
      rating: recipe.rating,
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

/**
 * This function retrieves the recipes based on created time, most recent recipe will show up first.
 * @param request None
 * @param response return a list of recipes in descending id number. 
 * Recipe is in json file including name, description, food, ingredients, size, rating, reviews, instructions, totalTime)
 * @returns {Promise<void>}
 */
exports.getRecentRecipes = async (request, response) => {
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
        reviews: {
          select: {
            content: true,
          },
        },
      },
      orderBy: {
        id: "desc",
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
      rating: recipe.rating,
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

/**
 * This function adds a new recipe.
 * @param request JSON body of a recipe including 
 * name, description, foodId, ingredients, size, intructions, totalTime, userID
 * @param response JSON file of the new created recipe 
 * @returns {Promise<void>}
 */
 exports.addRecipe = async (request, response) => {
  try {
    const {
      name,
      description,
      foodId,
      ingredients,
      size,
      instructions,
      totalTime,
      userId, //This is new if frontend needs to be updated
    } = request.body;

    // Create the recipe
    const recipe = await prisma.recipe.create({
      data: {
        name,
        description,
        food: {
          connect: {
            id: foodId,
          },
        },
        ingredients: {
          connectOrCreate: ingredients.map((ingredient) => ({
            where: { name: ingredient },
            create: { name: ingredient },
          })),
        },
        size,
        instructions,
        totalTime,
      },
    });

    // Add the recipe to userRecipe table
    await prisma.userRecipe.create({
      data: {
        userId,
        recipeId: recipe.id,
      },
    });

    response.status(201).json(recipe);
  } catch (error) {
    console.error("Error adding recipe:", error);
    response.status(500).json({ error: "Internal Server Error" });
  }
};

/**
 * This function updates a recipe information.
 * @param request JSON body key and value that needed to be updated. 
 * Example: {"name": "new Name", "size": "Small"} if you want to update 
 * the name of this recipe to "new Name" and the size to "Small"
 * @param response JSON file of the recipe with new updated information
 * @returns {Promise<void>}
 */
exports.updateRecipe = async (request, response) => {
  try {
    const newInfo = request.body;
    const id = parseInt(request.params.id);

    // Update the recipe
    const recipe = await prisma.recipe.update({
      where: {
        id: id,
      },
      data: newInfo,
    });

    response.status(201).json(recipe);
  } catch (error) {
    console.error("Error update recipe:", error);
    response.status(500).json({ error: "Internal Server Error" });
  }
};

/**
 * This function get recipe by id, id should be included in route
 * @param request None
 * @param response JSON of the recipe based on id
 * @returns {Promise<void>}
 */
exports.getSingleRecipe = async (request, response) => {
  try {
    const id = parseInt(request.params.id);

    // Get one recipe
    const recipe = await prisma.recipe.findUnique({
      where: {
        id: id,
      },
    });

    response.status(201).json(recipe);
  } catch (error) {
    console.error("Error getting recipe:", error);
    response.status(500).json({ error: "Internal Server Error" });
  }
};

/**
 * This function get rating by recipe based on recipe id
 * @param request None
 * @param response int of the current rating of the recipe
 * @returns {Promise<void>}
 */
exports.getRatingForRecipe = async (request, response) => {
  try {
    const id = parseInt(request.params.id);

    // Get recipe
    const recipe = await prisma.recipe.findUnique({
      where: {
        id: id,
      },
    });
    
    // Return the rating
    response.status(201).json(recipe.rating);
  } catch (error) {
    console.error("Error getting ratings:", error);
    response.status(500).json({ error: "Internal Server Error" });
  }
};

/**
 * This function update recipe rating
 * @param request newRating with the new number of rating that need to be updated.
 * Example: {"newRating": 3} if we want to update the rating of this recipe to 3
 * @param response the value of new rating
 * @returns {Promise<void>}
 */
exports.updateRecipeRating = async (request, response) => {
  try {
    const {newRating} = request.body;
    const id = parseInt(request.params.id);

    // Update the recipe rating
    const recipe = await prisma.recipe.update({
      where: {
        id: id,
      },
      data: {
        rating: newRating,
      },
    });
    
    response.status(201).json(recipe.rating);
  } catch (error) {
    console.error("Error updating rating:", error);
    response.status(500).json({ error: "Internal Server Error" });
  }
};