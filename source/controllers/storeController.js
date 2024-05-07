const supabase = require('../config/supabaseClient');

/**
 * This function retrieves the feed of coffee shops.
 * @param request
 * @param response
 * @returns {Promise<void>}
 */
exports.getFeed = async (request, response) => {
    try {
        const { data: shops, error } = await supabase
            .from('shops')
            .select('*, coffee_types(*), drink_types(*)');

        if (!error) {
            const formattedShops = shops.map((shop) => ({
                shopName: shop.name,
                coffeeType: shop.coffee_types.map((type) => type.type),
                drinkType: shop.drink_types.map((type) => type.type),
                size: [...new Set(shop.drink_types.map((type) => type.size))],
            }));

            response.json(formattedShops);
        }
        else {
            console.error('Error retrieving shops:', error);
            response.status(500).json({ error: 'Internal Server Error' });
        }
    } catch (error) {
        console.error('Error retrieving shops:', error);
        response.status(500).json({ error: 'Internal Server Error' });
    }
};