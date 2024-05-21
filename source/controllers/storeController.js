const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

/**
 * This function retrieves the feed of coffee shops.
 * @param request
 * @param response
 * @returns {Promise<void>}
 */
exports.getShops = async (request, response) => {
  try {
    const shops = await prisma.store.findMany({
      include: {
        Food: {
          select: {
            name: true,
            type: true,
            size: true,
          },
        },
      },
      orderBy: {
        name: "asc",
      },
    });

    const formattedShops = shops.map((shop) => ({
      shopName: shop.name,
      description: shop.description,
      address: shop.address,
      city: shop.city,
      state: shop.state,
      zip: shop.zip,
      phone: shop.phone,
      email: shop.email,
      foodItems: shop.Food.map((food) => ({
        name: food.name,
        type: food.type,
        size: food.size,
      })),
    }));

    response.json(formattedShops);
  } catch (error) {
    console.error("Error retrieving shops:", error);
    response.status(500).json({ error: "Internal Server Error" });
  }
};