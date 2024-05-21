document.addEventListener('DOMContentLoaded', reviewRecipe);
document.addEventListener('DOMContentLoaded', init);

function init() {
    let form = document.querySelector('form');
    form.addEventListener('submit', sendRecipeToDataBase);
}
function reviewRecipe(){
    const formData = JSON.parse(localStorage.getItem('newRecipe'));
    if (formData) {
        let recipeName = document.getElementById('recipe-name');
        recipeName.value = formData.recipe_name;
        recipeName.readOnly = true;

        if (formData.size) {
            let size = document.getElementById(formData.size.toLowerCase());
            size.checked = true;
            size.disabled = true;
        }

        if (formData.drink_type) {
            let drinkType = document.getElementById(formData.drink_type.toLowerCase());
            drinkType.checked = true;
            drinkType.disabled = true;
        }

        const ingredientsList = document.getElementById('ingredients-list');
        formData.ingredients.forEach(ingredient => {
            const ingredientInput = document.createElement('input');
            ingredientInput.type = 'text';
            ingredientInput.name = 'ingredients';
            ingredientInput.value = ingredient;
            ingredientInput.readOnly = true;
            ingredientsList.appendChild(ingredientInput);
        });

        let recipe = document.getElementById('recipe');
        recipe.value = formData.recipe;
        recipe.readOnly = true;
    }
};

function sendRecipeToDataBase(event) {
    event.preventDefault();
    localStorage.removeItem('newRecipe');
    window.href = '/recipe/saved';
    // connect to db and send data, may need new route
}