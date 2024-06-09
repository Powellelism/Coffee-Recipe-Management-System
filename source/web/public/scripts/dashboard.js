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
}

/**
 * Get the data of coffee shops from the file shops.json
 * @returns {array} the data of coffee shops as JSON object in an array
 */
async function getShops() {
  // Fetch the recipes from localStorage
  let shops = localStorage.getItem("shops");
  if (shops) return JSON.parse(shops);
  // if localStorage does not have data of shops
  try {
    //read the file by fetching api/get/shops check the status of the response and alert if 401
    shops = await fetch("/api/get/shops");
    if (shops.status === 401) {
      alert("Please login to view the shops");
    } else {
      shops = await shops.json();
      localStorage.setItem("shops", JSON.stringify(shops));
    }
  } catch (error) {
    console.error(error);
  }
}

document.addEventListener("DOMContentLoaded", async () => {
  // Your existing code here
  try {
    const response1 = await fetch("api/get/ratingrecipes", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response1.ok) {
      throw new Error("Failed to fetch recipes");
    }

    const response2 = await fetch("api/get/recentrecipes", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response2.ok) {
      throw new Error("Failed to fetch recipes");
    }

    const recipes1 = await response1.json();
    const recipes2 = await response2.json();
    console.log("Fetched recipes:", recipes1); // Log fetched data for debugging
    console.log("Fetched recipes:", recipes2); 

    const topCardsContainer = document.querySelector(".top-cards");
    const recentCardsContainer = document.querySelector(".recent-cards");

    // Clear any existing content in the containers
    topCardsContainer.innerHTML = "";
    recentCardsContainer.innerHTML = "";



    // Populate the top-ranked recipes
    recipes1.forEach((recipe) => {
      const recipeCardElement = new recipeCard();
      recipeCardElement.userName = recipe.userEmail ? (recipe.userEmail.includes('@') ? recipe.userEmail.split('@')[0] : recipe.userEmail) : "Jacob R.";
      recipeCardElement.recipeid = recipe.recipeId;
      recipeCardElement.recipeImage = "../assets/images/diy-coffee.jpg"; // Default image or you can use recipe.imageUrl if available
      recipeCardElement.recipeName = recipe.recipeName;
      recipeCardElement.recipeRating = recipe.rating;
      recipeCardElement.recipe = recipe.instructions;
      topCardsContainer.appendChild(recipeCardElement);
  
      const scrollAmount = 800;
    document.querySelector(".scroll-button1.left").addEventListener("click", () => {
      topCardsContainer.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    });

    document.querySelector(".scroll-button1.right").addEventListener("click", () => {
      topCardsContainer.scrollBy({ left: scrollAmount, behavior: "smooth" });
    });
    });

    // Populate the recent recipes
    recipes2.forEach((recipe) => {
      const recipeCardElement = new recipeCard();
      recipeCardElement.userName = recipe.userEmail ? (recipe.userEmail.includes('@') ? recipe.userEmail.split('@')[0] : recipe.userEmail) : "Jacob R.";
      recipeCardElement.recipeImage = "../assets/images/diy-coffee.jpg"; // Default image or you can use recipe.imageUrl if available
      recipeCardElement.recipeName = recipe.recipeName;
      recipeCardElement.recipeRating = recipe.rating;
      recipeCardElement.recipe = recipe.instructions;
      recipeCardElement.recipeid = recipe.recipeId;
      console.log(recipeCardElement.userName);
      recentCardsContainer.appendChild(recipeCardElement);
  
      const scrollAmount = 800;
    document.querySelector(".scroll-button2.left").addEventListener("click", () => {
      recentCardsContainer.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    });

    document.querySelector(".scroll-button2.right").addEventListener("click", () => {
      recentCardsContainer.scrollBy({ left: scrollAmount, behavior: "smooth" });
    });
    });

    console.log("Recipe cards added to the DOM"); // Log confirmation
  } catch (error) {
    console.error("Error loading recipes:", error);
  }

});


document.querySelector(".nav-trigger").addEventListener("click", function () {
  this.classList.toggle("active");
  console.log("Clicked menu");
  var mainListDiv = document.getElementById("mainListDiv");
  mainListDiv.classList.toggle("show-list");
  mainListDiv.style.display = "block";
});

window.addEventListener("scroll", function () {
  if (document.documentElement.scrollTop > 50) {
    document.querySelector(".nav").classList.add("affix");
    console.log("OK");
  } else {
    document.querySelector(".nav").classList.remove("affix");
  }
});
