// This test suite focuses on creating recipes and customizing them.
describe("Test customize recipe page functionality", () => {
  /**
   * Go to the customize page and add an ingredient
   */
  const goToCustomizePageAndAddIngredient = async () => {
    await page.goto("http://localhost:3000/recipe/customize");

    // Click the plus button on the screen
    await page.waitForSelector("#add-ingredient");
    const addIngredientButton = await page.$("#add-ingredient");
    await page.evaluate(
      (button) => button.scrollIntoView(),
      addIngredientButton,
    );
    await addIngredientButton.hover();
    await new Promise((resolve) => setTimeout(resolve, 1000));
    await addIngredientButton.click();

    // Wait for the second input ingredient box to appear and type into it.
    await page.waitForSelector("#ingredients-list input:nth-of-type(2)");

    const ingredientInput = await page.$(
      "#ingredients-list input:nth-of-type(2)",
    );
    await ingredientInput.click();
    await ingredientInput.type("Test Ingredient");

    const ingredientInputs = await page.$$("#ingredients-list input");
    expect(ingredientInputs.length).toBe(2);
  };

  // Add another ingredient to the recipe
  const addAnotherIngredient = async () => {
    await goToCustomizePageAndAddIngredient();
    await page.waitForSelector("#ingredients-list input:nth-of-type(1)");
    const recipeNameInput = await page.$(
      "#ingredients-list input:nth-of-type(1)",
    );
    await recipeNameInput.click();
    await recipeNameInput.click({ clickCount: 3 });
    await recipeNameInput.type("Espresso Shots");
  };

  beforeAll(async () => {
    //Go to each site and login
    await page.goto("http://localhost:3000/login");
    await page.waitForSelector("#email");
    const emailInput = await page.$("#email");
    await emailInput.type("123@123.com");
    await page.waitForSelector("#password");
    const passwordInput = await page.$("#password");
    await passwordInput.type("PkfUgyrsLtQfFvS");
    await page.click('form-field button[type="submit"]');
    await page.waitForNavigation();
  }, 60000);

  it("Testing on page load, editing the recipe name is autofocused", async () => {
    await page.goto("http://localhost:3000/recipe/customize");
    await page.waitForSelector("#recipe-name");
    const focusedElement = await page.evaluate(() => document.activeElement.id);
    expect(focusedElement).toBe("recipe-name");
  }, 20000);

  it("Testing we can add ingredients to the recipe", async () => {
    await goToCustomizePageAndAddIngredient();
  }, 30000);

  it("Testing we can edit previous recipes", async () => {
    await addAnotherIngredient();

    // Check that the ingredients are correct after editing them
    const ingredientTexts = await page.evaluate(() => {
      const inputs = document.querySelectorAll("#ingredients-list input");
      return Array.from(inputs).map((input) => input.value);
    });

    expect(ingredientTexts).toEqual(["Espresso Shots", "Test Ingredient"]);
  }, 30000);

  it("Testing we can delete ingredients by clearing the input field", async () => {
    await addAnotherIngredient();

    // Get the second ingredient and remove its text, which should delete it.
    await page.waitForSelector("#ingredients-list input:nth-of-type(2)");
    const ingredientInput = await page.$(
      "#ingredients-list input:nth-of-type(2)",
    );
    await ingredientInput.click();
    await ingredientInput.click({ clickCount: 3 });
    page.keyboard.press("Backspace");
    const ingredients = await page.$$("#ingredients-list input");

    expect(ingredients.length).toBe(1);
  }, 30000);

  it("Create a recipe and make sure it is saved in localStorage after clicking reviewRecipe button", async () => {
    await page.goto("http://localhost:3000/recipe/customize");

    // Add a recipe name
    await page.waitForSelector("#recipe-name");
    const recipeNameInput = await page.$("#recipe-name");
    await recipeNameInput.click({ clickCount: 3 });
    await page.keyboard.press("Backspace");
    await recipeNameInput.type("Test Recipe");

    // Select the size
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
    const expectedLocalStorage = {
      recipe_name: "Test Recipe",
      size: "GRANDE",
      drink_type: "COLD",
      ingredients: ["Test Ingredient"],
      recipe: "Test Description",
    };
    const localStorageData = await page.evaluate(() => {
      return JSON.parse(localStorage.getItem("newRecipe"));
    });
    expect(localStorageData).toEqual(expectedLocalStorage);
  }, 80000);
});
