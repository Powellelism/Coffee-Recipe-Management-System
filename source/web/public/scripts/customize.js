window.addEventListener("DOMContentLoaded", init);

/**
 * Initialize the customize page's event listeners.
 */
function init() {
  // grabbers
  const addIngredientButton = document.getElementById("add-ingredient");
  let allIngredients = document.querySelectorAll(
    '#ingredients-list input[type="text"]',
  );
  const form = document.querySelector("form");
  const generateButton = document.getElementById("generate-button");

  // event listeners
  addIngredientButton.addEventListener("click", addIngredient);
  allIngredients.forEach((input) => {
    input.addEventListener("input", removeInput);
  });
  form.addEventListener("submit", saveFormDataToLocalStorage);
  generateButton.addEventListener("click", callRoute);

  // for: if user clicks back button, the form is still populated
  if (localStorage.getItem("newRecipe")) {
    restorePopulatedForm();
  }
}

/**
 * Add an ingredient input field to the form.
 */
function addIngredient() {
  const container = document.getElementById("ingredients-list");
  const input = document.createElement("input");
  input.type = "text";
  input.name = "ingredients";
  input.required = true;
  container.insertBefore(input, this);
  updateIngredients();
}

/**
 * Update the ingredients list's event listeners.
 */
function updateIngredients() {
  let allIngredients = document.querySelectorAll(
    '#ingredients-list input[type="text"]',
  );
  allIngredients.forEach((input) => {
    input.removeEventListener("input", removeInput);
    input.addEventListener("input", removeInput);
  });
}

/**
 * Remove an ingredient input field from the form if the user deletes the text.
 */
function removeInput() {
  if (this.value === "") {
    this.parentElement.removeChild(this);
  }
}

/**
 * On form submission, save the form data to local storage and redirect to the review page.
 * @param {event} event
 */
function saveFormDataToLocalStorage(event) {
  event.preventDefault();

  const ingredients = [];
  document
    .querySelectorAll('#ingredients-list input[name="ingredients"]')
    .forEach((input) => {
      ingredients.push(input.value);
    });

  const formData = {
    recipe_name: document.getElementById("recipe-name").value,
    size: document.querySelector('input[name="size"]:checked')?.value,
    drink_type: document.querySelector('input[name="drink-type"]:checked')
      ?.value,
    ingredients: ingredients,
    recipe: document.getElementById("recipe").value,
  };

  localStorage.setItem("newRecipe", JSON.stringify(formData));
  window.location.href = "/recipe/review";
}

/**
 * Restore the form data if the user navigates back to the customize page.
 */
function restorePopulatedForm() {
  const formData = JSON.parse(localStorage.getItem("newRecipe"));
  if (formData) {
    let recipeName = document.getElementById("recipe-name");
    recipeName.value = formData.recipe_name;

    if (formData.size) {
      let size = document.getElementById(formData.size.toLowerCase());
      size.checked = true;
    }

    if (formData.drink_type) {
      let drinkType = document.getElementById(
        formData.drink_type.toLowerCase(),
      );
      drinkType.checked = true;
    }

    const ingredientsList = document.getElementById("ingredients-list");
    const addIngredientButton = document.getElementById("add-ingredient");
    document.querySelector("#ingredients-list input").remove();
    formData.ingredients.forEach((ingredient) => {
      const ingredientInput = document.createElement("input");
      ingredientInput.type = "text";
      ingredientInput.name = "ingredients";
      ingredientInput.value = ingredient;
      ingredientsList.insertBefore(ingredientInput, addIngredientButton);
    });

    let recipe = document.getElementById("recipe");
    recipe.value = formData.recipe;
  }
}

/**
 * Generate a recipe and when the user clicks "generate".
 * @param {event} event
 */
async function callRoute(event) {
  
  event.preventDefault();
 let recipeName = document.getElementById("recipe-name");

  // If the user hasn't entered a recipe name, do not do anything
  if (recipeName.value === "" || recipeName.value === "Recipe Name") {
    window.confirm("Please enter a recipe title, so we know what to generate!");
    console.log("Recipe name cannot be blank.");
    return;
  }

  // Define the data to be sent in the request body.
  const requestBody = {
    text: "Create short recipe for drink named" + recipeName.value
      + ". Pick a drink size: tall, grande, or venti;"
      + " a type: hot, or cold; a list of ingredients and their measurements separated by a comma;"
      + " a short recipe; a description of how to make the drink in paragraph form.",
    model: "@cf/meta/llama-3-8b-instruct",
  };

  // Create a mock request object
  const url = '/api/post/generateRecipe';
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(requestBody),
  });

  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }

  const responseData = await response.text();

  //const responseData = "Let's create a recipe for a refreshing Iced Latte!\n\nDrink Size: Venti\nDrink Type: Cold\n\nIngredients: 2% milk, 1 shot of espresso, 3 pumps of vanilla syrup, 3 pumps of caramel syrup, ice, and whipped cream\n\n**How to Make:**\n\nIn this recipe, we'll brew a shot of rich espresso and combine it with 2% milk, vanilla, and caramel syrup to create a sweet and creamy drink. To make this refreshing treat, start by brewing a shot of espresso into a cup. Add 3 pumps of vanilla syrup and 3 pumps of caramel syrup, stirring well to combine. Pour in 8 ounces of 2% milk, stirring gently to create a smooth and creamy blend. Fill a venti glass with ice and pour the iced latte over the ice. Top with whipped cream and a drizzle of caramel syrup, if desired. Stir gently and serve immediately. Enjoy your delicious and refreshing Iced Latte!";

  console.log('Response:', responseData);
  fillFormWithGeneratedRecipe(responseData);
}

/*
 * Fills out the "create recipe" form using generated recipe.
 */
function fillFormWithGeneratedRecipe(responseData) {
  const genSize = extractContent(/\*\*Drink Size:\*\* (.+?)\n/, responseData);
  console.log('Size:', genSize);
  const genType = extractContent(/\*\*Type:\*\* (.+?)\n/, responseData);
  console.log('Type:', genType);
  const genIngredients = extractContent(/\*\*Ingredients:\*\*(.+?)\n\n/, responseData)
    .split(',');
  console.log('Ingredients:', genIngredients);
  const genRecipe = extractContent(/\*\*How to Make:\*\*\n\n(.+?)/, responseData);
  console.log('Recipe:', genRecipe);

  let size = document.getElementById(genSize.toLowerCase());
  let type = document.getElementById(genType.toLowerCase());

  size.click();
  type.click();
  genIngredients.forEach(addIngredient);
}

/*
 * Helper function to parse generated string.
 */
function extractContent(pattern, text) {
  const regex = new RegExp(pattern, 's');
  const match = text.match(regex);
  return match ? match[1].trim() : null;
}