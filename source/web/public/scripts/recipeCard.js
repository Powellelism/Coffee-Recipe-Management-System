export default class recipeCard extends HTMLElement {
  constructor(userName, recipeImage, recipeName, recipeRating, recipe) {
    super();
    this.attachShadow({ mode: "open" });
    this.userName = userName || "Jacob R.";
    this.recipeImage = recipeImage || "../assets/images/diy-coffee.jpg";
    this.recipeName = recipeName || "Refreshing Mint Coffee";
    this.recipeRating = recipeRating || 4;
    this.recipe = recipe || "Combine 4 cups water, 4 shots of espresso, and 2 leaves of mint. Add ice. Enjoy!";
  }

  render() {
    const { userName, recipeImage, recipeName, recipeRating, recipe } = this;
    this.shadowRoot.innerHTML = `
        <head>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css" />
        </head>
        <article class="recipe-component">
            <span>${userName}</span>
                <section class="recipe-image-container">
                    <img class="recipe-image" src="${recipeImage}" alt="An image of ${recipeName}">
                </section>
                <a>${recipeName}</a>
                    <div class="stars">
                        ${[...Array(5)].map((_, i) => `
                          <i class="fa-solid fa-star ${i < recipeRating ? 'active' : ''}"></i>`).join('')}
                    </div>
            <section class="ingredients">
                    ${recipe}
            </section>
        </article>

        <script>
            const stars = document.querySelectorAll(".stars i");
            stars.forEach((star, index1) => {
            star.addEventListener("click", () => {
                stars.forEach((star, index2) => {
                index1 >= index2 ? star.classList.add("active") : star.classList.remove("active");
                });
            });
            });
        </script>
      `;

    // Create a link element for the external stylesheet
    const linkElement = document.createElement("link");
    linkElement.setAttribute("rel", "stylesheet");
    linkElement.setAttribute("href", "../styles/common.css");
    // Append the link element to the shadow root
    this.shadowRoot.appendChild(linkElement);

    // Attach the script for star rating functionality
    this.addStarRatingFunctionality();
  }

  addStarRatingFunctionality() {
    const stars = this.shadowRoot.querySelectorAll(".stars i");
    stars.forEach((star, index1) => {
      star.addEventListener("click", () => {
        stars.forEach((star, index2) => {
          index1 >= index2
            ? star.classList.add("active")
            : star.classList.remove("active");
        });
      });
    });
  }

  connectedCallback() {
    this.render();
  }
}

customElements.define("recipe-card", recipeCard);
