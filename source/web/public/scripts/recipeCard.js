class recipeCard extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.userName = 'Jacob R.';
        this.recipeImage = '../assets/images/diy-coffee.jpg';
        this.recipeName = 'Refreshing Mint Coffee';
        this.recipeRating = 4;
        this.recipe = 'Combine 4 cups water, 4 shots of espresso, and 2 leaves of mint. Add ice. Enjoy!';
    }

    render() {
        const { userName, recipeImage, recipeName, recipeRating, recipe } = this;
        this.shadowRoot.innerHTML = `
          <article class="recipe-component">
              <span>${userName}</span>
                <section class="recipe-image-container">
                    <img class="recipe-image" src="${recipeImage}" alt="An image of ${recipeName}">
                </section>
                <a>${recipeName}</a>
              <section class="star-rating">
                    ${'★'.repeat(recipeRating) + '☆'.repeat(5 - recipeRating)}
              </section>
              <section class="ingredients">
                    ${recipe}
              </section>
          </article>
      `;

        // Create a link element for the external stylesheet
        const linkElement = document.createElement('link');
        linkElement.setAttribute('rel', 'stylesheet');
        linkElement.setAttribute('href', '../styles/common.css');

        // Append the link element to the shadow root
        this.shadowRoot.appendChild(linkElement);
    }

    connectedCallback() {
        this.render();
    }
}

customElements.define('recipe-card', recipeCard);