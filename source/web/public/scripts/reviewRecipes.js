document.addEventListener("DOMContentLoaded", reviewRecipe);
document.addEventListener("DOMContentLoaded", init);

const DBtoSize = {
  "SMALL": "tall",
  "MEDIUM": "grande",
  "LARGE": "venti",
}
/**
 * Initialize the review page's event listeners.
 */
function init() {
  let form = document.querySelector("form");
  let regenButton = document.getElementById("generate-button");
  form.addEventListener("submit", sendRecipeToDataBase);
  regenButton.addEventListener("click", regenerateImage);
}

/**
 * Remake the form with the data from local storage, but disable all inputs.
 * Generate an image based on recipe.
 */
async function reviewRecipe() {
  const formData = JSON.parse(localStorage.getItem("newRecipe"));

  // Disable save button while image generates
  const saveButton = document.getElementById("submit-button");
  const img = document.getElementById("image");
  const regenButton = document.getElementById("generate-button");

  saveButton.disabled = true;
  img.style.display = 'none';
  regenButton.disabled = true;

  if (formData) {
    let recipeName = document.getElementById("recipe-name");
    recipeName.value = formData.recipe_name;
    recipeName.readOnly = true;
    if (formData.size) {
      let size = document.getElementById(DBtoSize[formData.size]);
      size.checked = true;
      size.disabled = true;
    }

    if (formData.drink_type) {
      let drinkType = document.getElementById(
        formData.drink_type.toLowerCase(),
      );
      drinkType.checked = true;
      drinkType.disabled = true;
    }

    const ingredientsList = document.getElementById("ingredients-list");
    formData.ingredients.forEach((ingredient) => {
      const ingredientInput = document.createElement("input");
      ingredientInput.type = "text";
      ingredientInput.name = "ingredients";
      ingredientInput.value = ingredient;
      ingredientInput.readOnly = true;
      ingredientsList.appendChild(ingredientInput);
    });

    let recipe = document.getElementById("recipe");
    recipe.value = formData.recipe;
    recipe.readOnly = true;

    // Make an image generation request and emable save button once done
    const imgURL = await requestImage(recipeName.value);
    img.src = JSON.parse(imgURL).url;

    // Unblock any disabled UI elements 
    img.style.display = 'block';
    saveButton.disabled = false;
    regenButton.disabled = false;
  }
}

/**
 * Regenerates the image given the recipe name.
 */
async function regenerateImage() {
  const recipeName = document.getElementById("recipe-name");
  const img = document.getElementById("image");
  const regenButton = document.getElementById("generate-button");
  const submitButton = document.getElementById("submit-button");

  // Disable buttons
  submitButton.disabled = true;
  regenButton.disabled = true;

  // Make image request
  const imgURL = await requestImage(recipeName);
  img.src = JSON.parse(imgURL).url;
  
  // Re-enable buttons
  submitButton.disabled = false;
  regenButton.disabled = false;
}

/**
 * Persist recipes and store them in the database.
 * @param {event} event
 */
async function sendRecipeToDataBase(event) {
  event.preventDefault();

  const recipeData = JSON.parse(localStorage.getItem("newRecipe"));
  let img = document.getElementById("image");

  let newBody = {
    name: recipeData.recipe_name,
    instructions: recipeData.recipe,
    ingredients: recipeData.ingredients,
    size: recipeData.size,
    image: img.src
  };

  const response = await fetch('/api/post/recipe', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newBody),
  });

  console.log("Saved: " + response);

  if (!response.ok) {
    console.error('Failed to save recipe to database');
  }
  else {
    localStorage.removeItem('newRecipe');
    window.location = '/dashboard';
  }
}

/**
 * Makes POST image generate request to LLM.
 * @param {string} recName: recipe name
 * @returns {string} image URL
 */
async function requestImage(recName) {
  const url = '/api/post/generateImage';
  const requestT = {
    recipeName: recName
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
  if (!responseT.ok) throw new Error('Failed to fetch data for image');

  return await responseT.text();
}
