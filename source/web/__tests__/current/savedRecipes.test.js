
describe('Testing saved recipes page', () => {
    const login = async () => {
        await page.goto("http://localhost:3000/login");
        await page.waitForSelector("#email");
        const emailInput = await page.$("#email");
        await emailInput.type("123@123.com");
        await page.waitForSelector("#password");
        const passwordInput = await page.$("#password");
        await passwordInput.type("PkfUgyrsLtQfFvS");
        await page.click('form-field button[type="submit"]');
        await page.waitForNavigation();
    };

    it('Test creating, saving, and viewing a recipe', async () => {
        // Login
        await login();
    
        // Navigate to the customize recipe page
        await page.goto('http://localhost:3000/recipe/customize');
    
        // Create a test recipe
        await page.waitForSelector("#recipe-name");
        const recipeNameInput = await page.$("#recipe-name");
        await recipeNameInput.click({ clickCount: 3 });
        await page.keyboard.press("Backspace");
        await recipeNameInput.type("Test Recipe");

        await page.waitForSelector('label[for="tall"]');
        await page.click('label[for="tall"]');

        // Select the drink type
        await page.waitForSelector('label[for="cold"]');
        await page.click('label[for="cold"]');

        // Add an ingredient
        await page.waitForSelector("#add-ingredient");
        await page.click("#add-ingredient");
        await page.waitForSelector("#ingredients-list input:nth-of-type(2)");
        const ingredientInput = await page.$(
            "#ingredients-list input:nth-of-type(2)",
        );
        await ingredientInput.click();
        await ingredientInput.type("Test Ingredient");

        // Enter the recipe description
        await page.waitForSelector("#recipe");
        const recipeDescriptionInput = await page.$("#recipe");
        await recipeDescriptionInput.click();
        await recipeDescriptionInput.type("Test Description");

        // Submit the recipe
        await page.waitForSelector("#submit-button");
        await page.click("#submit-button");
    
        // Navigate back to the home page
        await page.goto('http://localhost:3000/dashboard');
    
        // Click on saved recipes
        await page.waitForSelector('.saved-button');
        const savedRecipesButton = await page.$('.saved-button');
        await savedRecipesButton.click();
    
        // Check that the saved recipe appears
        await page.waitForNavigation();
        await page.waitForSelector('.your-cards recipe-card');
        const recipes = await page.evaluate(() => {
            const recipeCards = document.querySelectorAll('recipe-card');
            return Array.from(recipeCards).map(card => {
                const shadowRoot = card.shadowRoot;
                const recipeName = shadowRoot.querySelector('a').innerText;
                const createdBy = shadowRoot.querySelector('article + span').innerText;
                return { recipeName, createdBy };
            });
        });
    
        expect(recipes).toContain("Test Recipe");
            for (const recipe of recipes) {
                expect(recipe.createdBy).toBe('123');
            }
    }, 90000);
});