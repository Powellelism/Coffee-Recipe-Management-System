const supabase = require('../config/supabaseClient');

/**
 * This function retrieves the recipes with their associated data.
 * @param request
 * @param response
 * @returns {Promise<void>}
 */
exports.getRecipes = async (request, response) => {
    try {
        const { data, error } = await supabase
            .from('recipes')
            .select(`
        name,
        coffee_type,
        drink_types (
          type
        ),
        sizes (
          name
        ),
        recipe_add_ons (
          add_ons (
            name
          )
        )
      `)
            .order('name', { ascending: true });

        if (error) {
            throw new Error(error.message);
        }

        const formattedRecipes = data.map((recipe) => ({
            recipeName: recipe.name,
            coffeeType: recipe.coffee_type,
            drinkType: recipe.drink_types.type,
            size: recipe.sizes.name,
            addOns: recipe.recipe_add_ons.map((addOn) => addOn.add_ons.name),
        }));

        response.json(formattedRecipes);
    } catch (error) {
        console.error('Error retrieving recipes:', error);
        response.status(500).json({ error: 'Internal Server Error' });
    }
};