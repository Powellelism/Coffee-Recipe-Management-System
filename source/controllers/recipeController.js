const supabase = require('../config/supabaseClient');

/**
 * This function retrieves the recipes with their associated data.
 * @param request
 * @param response
 * @returns {Promise<void>}
 */
exports.getRecipes = async (request, response) => {
    try {
        const { data: recipes, error } = await supabase
            .from('recipes')
            .select(`
                *,
                drink_types(*),
                sizes(*),
                recipe_add_ons(
                  *,
                  add_ons(*)
                )
              `);

        if (!error) {
            const formattedRecipes = recipes.map((recipe) => ({
                recipeName: recipe.name,
                coffeeType: recipe.coffee_type,
                drinkType: recipe.drink_types.name,
                size: recipe.sizes.name,
                addOns: recipe.recipe_add_ons.map((addOn) => addOn.add_ons.name),
            }));

            response.json(formattedRecipes);
        } else {
            console.error('Error retrieving recipes:', error);
            response.status(500).json({ error: 'Internal Server Error' });
        }
    } catch (error) {
        console.error('Error retrieving recipes:', error);
        response.status(500).json({ error: 'Internal Server Error' });
    }
};