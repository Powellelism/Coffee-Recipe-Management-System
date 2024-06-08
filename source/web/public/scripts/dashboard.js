window.addEventListener("DOMContentLoaded", init);

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
    window.location = "/recipe/saved";
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
