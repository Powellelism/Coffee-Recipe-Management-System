window.addEventListener("DOMContentLoaded", init);
import recipeCard from './recipeCard.js';
/**
 * read data of coffee shops and add events for buttons on home page
 */
async function init() {
  try {
    getShops();
  } catch (error) {
    console.log(error);
  }

  let createButtonEl = document.querySelectorAll("button")[0];
  // add click event to the button for create new recipes
  createButtonEl.addEventListener("click", () => {
    window.location = "/recipe/customize";
  });
  let savedButtonEl = document.querySelectorAll("button")[1];
  //add click event to the button for view the saved recipes
  savedButtonEl.addEventListener("click", () => {
    window.location = "/recipe/foryou";
  });
  let aboutButtonEl = document.querySelectorAll("button")[2];
  //add click event to the button for view the saved recipes
  aboutButtonEl.addEventListener("click", () => {
    window.location = "/about";
  });
  let signOutButtonEl = document.querySelectorAll("button")[3];
  //add click event to the button for view the sign up page
  signOutButtonEl.addEventListener("click", () => {
    window.location = "/";
  });

    // Get the saved recipes
    await renderUserRecipes();
}

async function renderUserRecipes() {
    try {
        const response = await fetch("/api/get/userRecipes", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        
        if(!response.ok) {
            throw new Error('Failed to fetch user recipes');
        }

        const recipes = await response.json();
        console.log(recipes);

        const yourCardsContainer = document.querySelector(".your-cards");
        yourCardsContainer.innerHTML = "";

        recipes.forEach((recipe) => {
            const recipeCardElement = new recipeCard();
            recipeCardElement.recipeName = recipe.recipeName;
            recipeCardElement.recipeid = recipe.recipeId;
            recipeCardElement.recipeImage = "../assets/images/diy-coffee.jpg"; // Replace with actual image URL if available
            recipeCardElement.recipeRating = recipe.rating;
            recipeCardElement.recipe = recipe.instructions;
            yourCardsContainer.appendChild(recipeCardElement);
        });

        console.log("User recipes rendered successfully");
    }
    catch(error) {
        console.error(error);
    }
}

