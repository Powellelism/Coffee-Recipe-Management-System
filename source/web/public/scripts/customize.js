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
  generateButton.addEventListener("click", generateRecipe);

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
async function generateRecipe(event) {
  event.preventDefault();
  let recipeName = document.getElementById("recipe-name");

  // If the user hasn't entered a recipe name, do not do anything
  if (recipeName.value === "" || recipeName.value === "Recipe Name") {
    window.confirm("Please enter a recipe title, so we know what to generate!");
    console.log("Recipe name cannot be blank.");
    return;
  }

  // Makes 3 requests to the AI
  const url = '/api/post/generateRecipe';
  // First request to generate a size, ie Tall, Grande, Venti
  const requestSize = {
    recipeName: recipeName.value,
    category: "Size"
  }; 
  // Second request to generate type, ie Hot or Ice
  const requestType = {
    recipeName: recipeName.value,
    category: "Type"
  }; 
  // Third request to generate a list of ingredients
  const requestIngredients = {
    recipeName: recipeName.value,
    category: "Ingredients"
  }; 

  // Fetching the requests
  const responseSize = await fetch(url, {
    method: 'POST',
    headers: {
      'accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(requestSize),
  });
  const responseType = await fetch(url, {
    method: 'POST',
    headers: {
      'accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(requestType),
  });
  const responseIngredients = await fetch(url, {
    method: 'POST',
    headers: {
      'accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(requestIngredients),
  });

  // Ensure that all 3 responses are clean
  if (!responseType.ok || !responseSize.ok || !responseIngredients.ok) {
    throw new Error('Failed to fetch data');
  }

  // Transform the responses to text
  const responseSizeText = await responseSize.text();
  const responseTypeText = await responseType.text();
  const responseIngredientsText = await responseIngredients.text();

  // Truncates the quotation marks and brackets
  const responseSizeTextFinal = responseSizeText.split(":")[1].slice(1, -2);
  const responseTypeTextFinal = responseTypeText.split(":")[1].slice(1, -2);
  const responseIngredientsTextFinal = responseIngredientsText.split(":")[1].slice(1, -2);

  // Display the generated size and type
  let size = document.getElementById(responseSizeTextFinal.toLowerCase());
  let type = document.getElementById(responseTypeTextFinal.toLowerCase());
  size.click();
  type.click();

  // Turn the ingredient string into an array of ingreident strings
  const responseIngredientsArr = responseIngredientsTextFinal.split(",");
  const addIngredientButton = document.getElementById("add-ingredient");
  const container = document.getElementById("ingredients-list");

  // Iterate over the array of ingredients, add them one by one
  for (let i = 0; i < responseIngredientsArr.length - 1; i++) {
    addIngredientButton.click();
  }
  let counter = 0;
  let allIngredients = document.querySelectorAll('#ingredients-list input[type="text"]');
  allIngredients.forEach((input) => {
    input.value = responseIngredientsArr[counter];
    counter++;
  });
}

/*
 * Helper function to parse generated string.
 */
function extractContent(pattern, text) {
  const regex = new RegExp(pattern, 's');
  const match = text.match(regex);
  return match ? match[1].trim() : null;
}