window.addEventListener('DOMContentLoaded', init);

/**
 * Initialize the customize page's event listeners.
 */
function init() {
    
    // grabbers
    const addIngredientButton = document.getElementById('add-ingredient');
    let allIngredients = document.querySelectorAll('#ingredients-list input[type="text"]');
    const form = document.querySelector('form');

    // event listeners
    addIngredientButton.addEventListener('click', addIngredient);
    allIngredients.forEach(input => {
        input.addEventListener('input', removeInput);
    });
    form.addEventListener('submit', saveFormDataToLocalStorage);

    // for: if user clicks back button, the form is still populated
    if(localStorage.getItem('newRecipe')) {
        restorePopulatedForm();
    }
}



/**
 * Add an ingredient input field to the form.
 */
function addIngredient() {
    const container = document.getElementById('ingredients-list');
    const input = document.createElement('input');
    input.type = 'text';
    input.name = 'ingredients';
    input.required = true;
    container.insertBefore(input, this);
    updateIngredients();
}

/**
 * Update the ingredients list's event listeners.
 */
function updateIngredients() {
    let allIngredients = document.querySelectorAll('#ingredients-list input[type="text"]');
    allIngredients.forEach(input => {
        input.removeEventListener('input', removeInput);
        input.addEventListener('input', removeInput);
    });
}

/**
 * Remove an ingredient input field from the form if the user deletes the text.
 */
function removeInput() {
    if (this.value === '') {
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
    document.querySelectorAll('#ingredients-list input[name="ingredients"]').forEach(input => {
        ingredients.push(input.value);
    });

    const formData = {
        recipe_name: document.getElementById('recipe-name').value,
        size: document.querySelector('input[name="size"]:checked')?.value,
        drink_type: document.querySelector('input[name="drink-type"]:checked')?.value,
        ingredients: ingredients,
        recipe: document.getElementById('recipe').value
    };

    localStorage.setItem('newRecipe', JSON.stringify(formData));
    window.location.href = '/recipe/review';
}

/**
 * Restore the form data if the user navigates back to the customize page.
 */
function restorePopulatedForm() {
    const formData = JSON.parse(localStorage.getItem('newRecipe'));
    if (formData) {
        let recipeName = document.getElementById('recipe-name');
        recipeName.value = formData.recipe_name;

        if (formData.size) {
            let size = document.getElementById(formData.size.toLowerCase());
            size.checked = true;
        }

        if (formData.drink_type) {
            let drinkType = document.getElementById(formData.drink_type.toLowerCase());
            drinkType.checked = true;
        }

        const ingredientsList = document.getElementById('ingredients-list');
        const addIngredientButton = document.getElementById('add-ingredient');
        document.querySelector('#ingredients-list input').remove();
        formData.ingredients.forEach(ingredient => {
            const ingredientInput = document.createElement('input');
            ingredientInput.type = 'text';
            ingredientInput.name = 'ingredients';
            ingredientInput.value = ingredient;
            ingredientsList.insertBefore(ingredientInput, addIngredientButton);
        });

        let recipe = document.getElementById('recipe');
        recipe.value = formData.recipe;
    }
}