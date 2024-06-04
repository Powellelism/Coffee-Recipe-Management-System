describe("Test customize recipe page functionality", () => {
    beforeAll(async () => {
        await page.goto("https://powellelism.site/recipe/customize");
    });

    it('Testing on page load, editing the recipe name is autofocued', async () => {
        await page.waitForSelector('#recipe-name');
        const focusedElement = await page.evaluate(() => document.activeElement.id);
        expect(focusedElement).toBe('recipe-name');
    });
});