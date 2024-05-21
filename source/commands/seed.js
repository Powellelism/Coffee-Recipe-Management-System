const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    const store1 = await prisma.store.create({ data: { name: 'Starbucks', address: '123 Main St', city: 'Seattle', state: 'WA', zip: '98101', phone: '206-123-4567', email: 'info@starbucks.com' } });
    const store2 = await prisma.store.create({ data: { name: 'Coffee Bean & Tea Leaf', address: '456 Elm St', city: 'Los Angeles', state: 'CA', zip: '90001', phone: '213-987-6543', email: 'info@coffeebean.com' } });
    const store3 = await prisma.store.create({ data: { name: 'Peet\'s Coffee', address: '789 Oak Ave', city: 'San Francisco', state: 'CA', zip: '94101', phone: '415-555-1234', email: 'info@peets.com' } });
    const store4 = await prisma.store.create({ data: { name: 'Dunkin\' Donuts', address: '321 Maple Rd', city: 'Boston', state: 'MA', zip: '02101', phone: '617-555-7890', email: 'info@dunkin.com' } });
    const store5 = await prisma.store.create({ data: { name: 'Philz Coffee', address: '159 Pine St', city: 'San Francisco', state: 'CA', zip: '94111', phone: '415-555-9876', email: 'info@philzcoffee.com' } });
    const store6 = await prisma.store.create({ data: { name: 'Blue Bottle Coffee', address: '753 Valencia St', city: 'San Francisco', state: 'CA', zip: '94110', phone: '415-555-4321', email: 'info@bluebottlecoffee.com' } });
    const store7 = await prisma.store.create({ data: { name: 'Intelligentsia Coffee', address: '1331 W Sunset Blvd', city: 'Los Angeles', state: 'CA', zip: '90026', phone: '213-555-2468', email: 'info@intelligentsiacoffee.com' } });
    const store8 = await prisma.store.create({ data: { name: 'Caribou Coffee', address: '1000 Nicollet Mall', city: 'Minneapolis', state: 'MN', zip: '55403', phone: '612-555-1357', email: 'info@cariboucoffee.com' } });
    const store9 = await prisma.store.create({ data: { name: 'Dutch Bros Coffee', address: '1725 NE Cushing Dr', city: 'Bend', state: 'OR', zip: '97701', phone: '541-555-8642', email: 'info@dutchbros.com' } });
    const store10 = await prisma.store.create({ data: { name: 'Grounds for Coffee', address: '2565 Main St', city: 'Vancouver', state: 'BC', zip: 'V5T 3J4', phone: '604-555-9753', email: 'info@groundsforcoffee.com' } });

    const drink1 = await prisma.food.create({ data: { name: 'Espresso', price: 2.99, storeId: store1.id, type: 'Coffee', size: 'SMALL' } });
    const drink2 = await prisma.food.create({ data: { name: 'Cappuccino', price: 3.99, storeId: store2.id, type: 'Coffee', size: 'MEDIUM' } });
    const drink3 = await prisma.food.create({ data: { name: 'Latte', price: 4.49, storeId: store3.id, type: 'Coffee', size: 'LARGE' } });
    const drink4 = await prisma.food.create({ data: { name: 'Mocha', price: 4.99, storeId: store4.id, type: 'Coffee', size: 'LARGE' } });
    const drink5 = await prisma.food.create({ data: { name: 'Americano', price: 2.49, storeId: store5.id, type: 'Coffee', size: 'SMALL' } });
    const drink6 = await prisma.food.create({ data: { name: 'Iced Coffee', price: 3.49, storeId: store6.id, type: 'Coffee', size: 'MEDIUM' } });
    const drink7 = await prisma.food.create({ data: { name: 'Chai Latte', price: 4.29, storeId: store7.id, type: 'Tea', size: 'MEDIUM' } });
    const drink8 = await prisma.food.create({ data: { name: 'Green Tea Latte', price: 4.79, storeId: store8.id, type: 'Tea', size: 'LARGE' } });
    const drink9 = await prisma.food.create({ data: { name: 'Hot Chocolate', price: 3.29, storeId: store9.id, type: 'Hot Chocolate', size: 'MEDIUM' } });
    const drink10 = await prisma.food.create({ data: { name: 'Iced Tea', price: 2.79, storeId: store10.id, type: 'Tea', size: 'LARGE' } });

    const ingredient1 = await prisma.ingredient.create({ data: { name: 'Espresso' } });
    const ingredient2 = await prisma.ingredient.create({ data: { name: 'Steamed Milk' } });
    const ingredient3 = await prisma.ingredient.create({ data: { name: 'Milk Foam' } });
    const ingredient4 = await prisma.ingredient.create({ data: { name: 'Mocha Sauce' } });
    const ingredient5 = await prisma.ingredient.create({ data: { name: 'Hot Water' } });
    const ingredient6 = await prisma.ingredient.create({ data: { name: 'Ice' } });
    const ingredient7 = await prisma.ingredient.create({ data: { name: 'Chai Tea Concentrate' } });
    const ingredient8 = await prisma.ingredient.create({ data: { name: 'Matcha Green Tea Powder' } });
    const ingredient9 = await prisma.ingredient.create({ data: { name: 'Cocoa Powder' } });
    const ingredient10 = await prisma.ingredient.create({ data: { name: 'Black Tea' } });

    const recipe1 = await prisma.recipe.create({ data: { name: 'Espresso Recipe', foodId: drink1.id, size: 'SMALL', instructions: '1. Grind and tamp espresso beans\n2. Pull espresso shot', totalTime: 2 } });
    const recipe2 = await prisma.recipe.create({ data: { name: 'Cappuccino Recipe', foodId: drink2.id, size: 'MEDIUM', instructions: '1. Pull espresso shot\n2. Steam milk and create foam\n3. Pour steamed milk and foam over espresso', totalTime: 5 } });
    const recipe3 = await prisma.recipe.create({ data: { name: 'Latte Recipe', foodId: drink3.id, size: 'LARGE', instructions: '1. Pull espresso shot\n2. Steam milk\n3. Pour steamed milk over espresso', totalTime: 5 } });
    const recipe4 = await prisma.recipe.create({ data: { name: 'Mocha Recipe', foodId: drink4.id, size: 'LARGE', instructions: '1. Pull espresso shot\n2. Add mocha sauce\n3. Steam milk\n4. Pour steamed milk over espresso and mocha sauce', totalTime: 6 } });
    const recipe5 = await prisma.recipe.create({ data: { name: 'Americano Recipe', foodId: drink5.id, size: 'SMALL', instructions: '1. Pull espresso shot\n2. Add hot water', totalTime: 2 } });
    const recipe6 = await prisma.recipe.create({ data: { name: 'Iced Coffee Recipe', foodId: drink6.id, size: 'MEDIUM', instructions: '1. Brew coffee\n2. Pour over ice', totalTime: 3 } });
    const recipe7 = await prisma.recipe.create({ data: { name: 'Chai Latte Recipe', foodId: drink7.id, size: 'MEDIUM', instructions: '1. Steam milk\n2. Add chai tea concentrate\n3. Pour steamed milk over chai tea concentrate', totalTime: 4 } });
    const recipe8 = await prisma.recipe.create({ data: { name: 'Green Tea Latte Recipe', foodId: drink8.id, size: 'LARGE', instructions: '1. Steam milk\n2. Add matcha green tea powder\n3. Pour steamed milk over matcha powder', totalTime: 4 } });
    const recipe9 = await prisma.recipe.create({ data: { name: 'Hot Chocolate Recipe', foodId: drink9.id, size: 'MEDIUM', instructions: '1. Steam milk\n2. Add cocoa powder\n3. Pour steamed milk over cocoa powder', totalTime: 4 } });
    const recipe10 = await prisma.recipe.create({ data: { name: 'Iced Tea Recipe', foodId: drink10.id, size: 'LARGE', instructions: '1. Brew black tea\n2. Pour over ice', totalTime: 3 } });

    await prisma.recipe.update({
        where: { id: recipe1.id },
        data: {
            ingredients: {
                connect: [{ id: ingredient1.id }],
            },
        },
    });

    await prisma.recipe.update({
        where: { id: recipe2.id },
        data: {
            ingredients: {
                connect: [{ id: ingredient1.id }, { id: ingredient2.id }, { id: ingredient3.id }],
            },
        },
    });

    await prisma.recipe.update({
        where: { id: recipe3.id },
        data: {
            ingredients: {
                connect: [{ id: ingredient1.id }, { id: ingredient2.id }],
            },
        },
    });

    await prisma.recipe.update({
        where: { id: recipe4.id },
        data: {
            ingredients: {
                connect: [{ id: ingredient1.id }, { id: ingredient4.id }, { id: ingredient2.id }],
            },
        },
    });

    await prisma.recipe.update({
        where: { id: recipe5.id },
        data: {
            ingredients: {
                connect: [{ id: ingredient1.id }, { id: ingredient5.id }],
            },
        },
    });

    await prisma.recipe.update({
        where: { id: recipe6.id },
        data: {
            ingredients: {
                connect: [{ id: ingredient6.id }],
            },
        },
    });

    await prisma.recipe.update({
        where: { id: recipe7.id },
        data: {
            ingredients: {
                connect: [{ id: ingredient2.id }, { id: ingredient7.id }],
            },
        },
    });

    await prisma.recipe.update({
        where: { id: recipe8.id },
        data: {
            ingredients: {
                connect: [{ id: ingredient2.id }, { id: ingredient8.id }],
            },
        },
    });

    await prisma.recipe.update({
        where: { id: recipe9.id },
        data: {
            ingredients: {
                connect: [{ id: ingredient2.id }, { id: ingredient9.id }],
            },
        },
    });

    await prisma.recipe.update({
        where: { id: recipe10.id },
        data: {
            ingredients: {
                connect: [{ id: ingredient6.id }, { id: ingredient10.id }],
            },
        },
    });

    await prisma.rating.createMany({
        data: [
            { rateableId: recipe1.id, rateableType: 'Recipe', score: 4, recipeId: recipe1.id },
            { rateableId: recipe2.id, rateableType: 'Recipe', score: 5, recipeId: recipe2.id },
            { rateableId: recipe3.id, rateableType: 'Recipe', score: 4, recipeId: recipe3.id },
            { rateableId: recipe4.id, rateableType: 'Recipe', score: 5, recipeId: recipe4.id },
            { rateableId: recipe5.id, rateableType: 'Recipe', score: 3, recipeId: recipe5.id },
            { rateableId: recipe6.id, rateableType: 'Recipe', score: 4, recipeId: recipe6.id },
            { rateableId: recipe7.id, rateableType: 'Recipe', score: 5, recipeId: recipe7.id },
            { rateableId: recipe8.id, rateableType: 'Recipe', score: 4, recipeId: recipe8.id },
            { rateableId: recipe9.id, rateableType: 'Recipe', score: 3, recipeId: recipe9.id },
            { rateableId: recipe10.id, rateableType: 'Recipe', score: 5, recipeId: recipe10.id },
        ],
    });

    console.log('Seeding completed successfully.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });