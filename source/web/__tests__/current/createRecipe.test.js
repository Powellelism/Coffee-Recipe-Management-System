describe("Test customize recipe page functionality", () => {
    beforeAll(async () => {
        await page.goto("https://powellelism.site/recipe/customize");
    });

    it('Testing on page load, editing the recipe name is autofocued', async () => {
        await page.waitForSelector('#recipe-name');
        const focusedElement = await page.evaluate(() => document.activeElement.id);
        expect(focusedElement).toBe('recipe-name');
    });

    it('Testing we can add ingredients to the recipe', async () => {
        const addIngredientButton = await page.$('#add-ingredient');
        await addIngredientButton.click();
        const ingredientInput = await page.$('.ingredients-list input:nth-of-type(2)');
        await ingredientInput.click();
        await ingredientInput.type('Test Ingredient');
        const ingredientInputs = await page.$$('.ingredients-list input');
        expect(ingredientInputs.length).toBe(2);
    });
});