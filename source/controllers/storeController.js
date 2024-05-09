const supabase = require("../config/supabaseClient");

/**
 * This function retrieves the feed of coffee shops.
 * @param request
 * @param response
 * @returns {Promise<void>}
 */
exports.getShops = async (request, response) => {
  try {
    const { data, error } = await supabase
      .from("shops")
      .select(
        `
                name,
                coffee_types (
                  type
                ),
                drink_types (
                  type,
                  size
                )
              `,
      )
      .order("name", { ascending: true });

    if (error) {
      console.error("Error retrieving shops:", error);
      throw new Error(error.message);
    }

    const formattedShops = data.map((shop) => ({
      shopName: shop.name,
      coffeeType: shop.coffee_types.map((type) => type.type),
      drinkType: shop.drink_types.map((type) => type.type),
      size: [...new Set(shop.drink_types.map((type) => type.size))],
    }));

    response.json(formattedShops);
  } catch (error) {
    console.error("Error retrieving shops:", error);
    response.status(500).json({ error: "Internal Server Error" });
  }
};
