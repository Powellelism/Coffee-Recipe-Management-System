window.addEventListener("DOMContentLoaded", init);

const sizeToDB = {
  TALL: "SMALL",
  GRANDE: "MEDIUM",
  VENTI: "LARGE",
};

const DBtoSize = {
  SMALL: "tall",
  MEDIUM: "grande",
  LARGE: "venti",
};
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
    size: sizeToDB[document.querySelector('input[name="size"]:checked')?.value],
    drink_type: document.querySelector('input[name="drink-type"]:checked')
      ?.value,
    ingredients: ingredients,
    recipe: document.getElementById("recipe").value,
    // imageUrl: document.getElementById("image").src
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
      let size = document.getElementById(DBtoSize[formData.size]);
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
  let generateButton = document.getElementById("generate-button");
  let reviewButton = document.getElementById("submit-button");

  // If the user hasn't entered a recipe name, do not do anything
  if (recipeName.value === "" || recipeName.value === "Recipe Name") {
    window.confirm("Please enter a recipe title, so we know what to generate!");
    return;
  }

  // Disable the generate button while generating
  generateButton.disabled = true;
  reviewButton.disabled = true;
  generateButton.textContent = "Magic brewing...";

  // Remove any previously existing ingredients
  let cleanIngredients = document.querySelectorAll('#ingredients-list input[type="text"]');
  cleanIngredients.forEach((input) => {
    input.value = "";
    input.parentElement.removeChild(input);
  });
  updateIngredients();

  // Makes 4 requests to text generator
  const size = await requestText("Size", recipeName.value);
  const type = await requestText("Type", recipeName.value);
  const ingredients = await requestText("Ingredients", recipeName.value);
  const recipe = await requestText("Recipe", recipeName.value, ingredients);

  // Fill out form with generated text
  fillForm('select', size);
  fillForm('select', type);
  fillForm('list', ingredients);
  fillForm('fill', recipe);

  // Reset generate button, indicating generation complete
  generateButton.disabled = false;
  reviewButton.disabled = false;
  generateButton.textContent = "Generate again pls <3";
}

/**
 * Makes POST text generate request to LLM.
 * @param {string} c: category
 * @param {string} recName: recipe name
 * @param {string} ing: ingredients
 * @returns {string}
 */
async function requestText(c, recName, ing) {
  const url = '/api/post/generateRecipe';
  const requestT = {
    recipeName: recName,
    category: c,
    ingredients: ing
  };

  const responseT = await fetch(url, {
    method: 'POST',
    headers: {
      'accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(requestT),
  });

  // Ensure that the response is clean
  if (!responseT.ok) throw new Error('Failed to fetch data for ' + c + ' category');

  // Parse response, convert to desired format
  const responseString = await responseT.text();
  const responseValue = JSON.parse(responseString).response;
  return responseValue.toLowerCase();
}

/**
 * Fills out the form based on generated data.
 * @param {string} category: one of 'select', 'list', or 'fill'
 * @param {event} id: id of element to be filled out. Ex: grande, hot, recipe
 */
function fillForm(category, id) {
  switch (category) {
    case 'select':
      let button = document.getElementById(id);
      button.click();

      break;

    case 'list':
      // Turn the ingredient string into an array of ingreident strings
      const ingredientsArr = id.split(",");
      const adder = document.getElementById("add-ingredient");

      // Iterate over the array of ingredients, add them one by one
      for (let i = 0; i < ingredientsArr.length - 1; i++) {
        adder.click();
      }

      let counter = 0;
      let allIngredients = document.querySelectorAll('#ingredients-list input[type="text"]');
      allIngredients.forEach((input) => {
        input.value = ingredientsArr[counter];
        counter++;
      });

      break;

    case 'fill':
      const textarea = document.getElementById('recipe');
      textarea.value = id;
      break;
  };
}