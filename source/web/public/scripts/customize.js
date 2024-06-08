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
 * Generate a recipe and fill in the form when the user clicks "generate".
 * @param {event} event
 */
async function callRoute(event) {
  event.preventDefault();

  // Disable field input requirements so user can generate without errors
  const requiredFields = document.querySelectorAll("[required]");
  requiredFields.forEach(field => field.removeAttribute("required"));

  let recipeName = document.getElementById("recipe-name");
  let recipe = document.getElementById("recipe");
  recipeName.value = 'generated';

  // Define the data to be sent in the request body.
  // TODO; Should the user be able to specify certain things, like give a title?

  const url = '/api/post/generateRecipe';
  const requestBody = {
    text: "Give 3 sentences about math",
    model: "@cf/meta/llama-3-8b-instruct",
  };

  // Create a mock request object
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
  console.log(responseData);


  console.log('Response:', responseData);

  /* try {
    // Make a POST request to the text generation endpoint
    const response = await fetch("/api/text-generate/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(requestData)
    });

    if (!response.ok) {
      recipe.value = 'error';
      throw new Error("Network response was not ok");
    }

    const data = await response.json();

    if (data.success) {
      const generatedText = data.result.answer;

    } else {
      console.error("Error generating text: ", data.error);
    }
  } catch (error) {
    console.error("Fetch error: ", error);
  } */

  
}