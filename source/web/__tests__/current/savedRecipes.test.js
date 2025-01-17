// This test suite ensures the user's saved recipe page is personalized correctly.

jest.setTimeout(90000); //needed for ci/cd pipeline to run

describe("Testing saved recipes page", () => {
  /**
   * Login to the website.
   */
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

  it("Test creating, saving, and viewing a recipe", async () => {
    // Login
    await login();

    // Navigate to the customize recipe page
    await page.goto("http://localhost:3000/recipe/customize");

    // Create a test recipe
    await page.waitForSelector("#recipe-name");
    const recipeNameInput = await page.$("#recipe-name");
    await recipeNameInput.click({ clickCount: 3 });
    await page.keyboard.press("Backspace");
    await recipeNameInput.type("Test Recipe");

    // Select the recipe type
    await page.waitForSelector('label[for="grande"]');
    await page.click('label[for="grande"]');

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

    await page.waitForSelector('form-field button[type="submit"]');
    await page.click('form-field button[type="submit"]');

    // Navigate to the saved recipes page
    await page.goto("http://localhost:3000/recipe/foryou");

    await page.waitForSelector(".your-cards recipe-card");
    // Check that the saved recipe appears
    const recipes = await page.evaluate(() => {
      const recipeCards = document.querySelectorAll("recipe-card");
      return Array.from(recipeCards).map((card) => {
        const shadowRoot = card.shadowRoot;
        const recipeNameElement = shadowRoot.querySelector("a");
        const createdByElement = shadowRoot.querySelector("article span");
        const recipeName = recipeNameElement
          ? recipeNameElement.innerText
          : null;
        const createdBy = createdByElement ? createdByElement.innerText : null;
        return { recipeName, createdBy };
      });
    });

    // Check that our new recipe appears in the saved Recipes.
    expect(recipes).toContainEqual(
      expect.objectContaining({ recipeName: "Test Recipe" }),
    );
    for (const recipe of recipes) {
      expect(recipe.createdBy).toBe("123");
    }
  }, 90000);
});
