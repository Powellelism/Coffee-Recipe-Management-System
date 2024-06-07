require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const { faker } = require('@faker-js/faker');

const prisma = new PrismaClient();

async function createMockData() {
    const numberOfStores = 6;
    const foodsPerStore = 4;
    const recipesPerFood = 3;

    // Create Stores
    for (let i = 0; i < numberOfStores; i++) {
        const store = await prisma.store.create({
            data: {
                name: faker.company.name(),
                description: faker.company.catchPhrase(),
                address: faker.location.street(),
                city: faker.location.city(),
                state: faker.location.state(),
                zip: faker.location.zipCode(),
                phone: faker.phone.number(),
                email: faker.internet.email(),
            },
        });

        // Create Foods
        for (let j = 0; j < foodsPerStore; j++) {
            const food = await prisma.food.create({
                data: {
                    name: faker.commerce.productName(),
                    description: faker.commerce.productDescription(),
                    price: parseFloat(faker.commerce.price({ min: 10, max: 100, dec: 2 })),
                    storeId: store.id,
                    type: faker.commerce.productMaterial(),
                    size: faker.helpers.arrayElement(['SMALL', 'MEDIUM', 'LARGE']),
                },
            });

            // Create Recipes
            for (let k = 0; k < recipesPerFood; k++) {
                const recipe = await prisma.recipe.create({
                    data: {
                        name: faker.lorem.words(2),
                        description: faker.lorem.sentence(),
                        foodId: food.id,
                        size: faker.helpers.arrayElement(['SMALL', 'MEDIUM', 'LARGE']),
                        instructions: faker.lorem.paragraph(),
                        totalTime: faker.number.int({ min: 10, max: 60 }),
                        // rating: faker.number.int({ min: 1, max: 100 })
                    },
                });

                // Ensure unique ingredient names by appending a unique identifier
                const ingredientName = `${faker.commerce.productMaterial()} ${Date.now()}`;
                await prisma.ingredient.create({
                    data: {
                        name: ingredientName,
                        recipes: {
                            connect: { id: recipe.id }
                        }
                    },
                });
            }
        }
    }

    console.log('Mock data successfully inserted');
}

createMockData()
  .catch((e) => {
    console.error('Error inserting mock data:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
