window.addEventListener('DOMContentLoaded', init);

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

    if(localStorage.getItem('newRecipe')) {
        restorePopulatedForm();
    }
}



// functions for event listeners
function addIngredient() {
    const container = document.getElementById('ingredients-list');
    const input = document.createElement('input');
    input.type = 'text';
    input.name = 'ingredients';
    container.insertBefore(input, this);
    updateIngredients();
}

function updateIngredients() {
    let allIngredients = document.querySelectorAll('#ingredients-list input[type="text"]');
    allIngredients.forEach(input => {
        input.removeEventListener('input', removeInput);
        input.addEventListener('input', removeInput);
    });
}

function removeInput() {
    if (this.value === '') {
        this.parentElement.removeChild(this);
    }
}

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