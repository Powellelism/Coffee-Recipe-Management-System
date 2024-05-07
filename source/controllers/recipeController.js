const supabase = require("../config/supabaseClient");

/**
 * This function retrieves the recipes with their associated data.
 * @param request
 * @param response
 * @returns {Promise<void>}
 */
exports.getRecipes = async (request, response) => {
  try {
    const { data, error } = await supabase
      .from("recipes")
      .select(
        `
                name,
                coffee_type,
                drink_type_id,
                size_id,
                recipe_add_ons (
                  add_on_id
                )
              `,
      )
      .order("name", { ascending: true });

    if (error) {
      console.error("Error retrieving recipes:", error);
      throw new Error(error.message);
    }

    const formattedRecipes = data.map((recipe) => ({
      recipeName: recipe.name,
      coffeeType: recipe.coffee_type,
      drinkType: recipe.drink_types_id,
      size: recipe.size_id,
      addOns: recipe.recipe_add_ons.map((addOn) => addOn.add_ons_id),
    }));

    response.json(formattedRecipes);
  } catch (error) {
    console.error("Error retrieving recipes:", error);
    response.status(500).json({ error: "Internal Server Error" });
  }
};
