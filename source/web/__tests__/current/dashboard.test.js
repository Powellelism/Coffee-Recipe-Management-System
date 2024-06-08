describe('Testing home page', () => {

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

    it('Test home button on page load', async () => {
        await login()
        await page.goto('http://localhost:3000/');
        await page.waitForSelector('a[href="/"]');
        const homeButton = await page.$('a[href="/"]');
        await homeButton.click();
        await page.waitForNavigation();
        const homeURL = page.url();
        expect(homeURL).toBe('http://localhost:3000/');
    }, 20000);

    it('Test Create Recipe button on home page', async () => {
        await login()
        await page.goto('http://localhost:3000/');
        await page.waitForSelector('.create-button');
        const createRecipeButton = await page.$('.create-button');
        await createRecipeButton.click();
        await page.waitForNavigation();
        const createRecipeURL = page.url();
        expect(createRecipeURL).toBe('http://localhost:3000/recipe/customize');
    }, 30000);

    it('Test About button on home page', async () => {
        await login()
        await page.goto('http://localhost:3000/');
        await page.waitForSelector('.about-button');
        const aboutButton = await page.$('.about-button');
        await aboutButton.click();
        await page.waitForNavigation();
        const aboutURL = page.url();
        expect(aboutURL).toBe('http://localhost:3000/about');
    }, 30000);

    it('Test top ranked recipes are in correct order on page load', async () => {
        await login();
        await page.goto('http://localhost:3000/');
        await page.waitForSelector('.top-cards recipe-card');

        const recipes = await page.evaluate(() => {
            const recipeCards = document.querySelectorAll('.top-cards recipe-card');
            const cards = Array.from(recipeCards);
            return cards.map(card => {
                const shadowRoot = card.shadowRoot;
                const recipeName = shadowRoot.querySelector('a');
                const rating = shadowRoot.querySelectorAll('.fa-star.active').length;
                return { recipeName, rating};
            });
        });

        for(let i = 0; i < recipes.length - 1; i++) {
            expect(recipes[i].rating).toBeGreaterThanOrEqual(recipes[i + 1].rating);
        }
    }, 90000);
});