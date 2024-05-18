// grabbers
const addIngredientButton = document.getElementById('add-ingredient');
let allIngredients = document.querySelectorAll('#ingredients-container input[type="text"]');

// event listeners
addIngredientButton.addEventListener('click', addIngredient);
allIngredients.forEach(input => {
    input.addEventListener('input', removeInput);
});

// functions for event listeners
function addIngredient() {
    const container = document.getElementById('ingredients-container');
    const input = document.createElement('input');
    input.type = 'text';
    input.name = 'ingredients';
    container.insertBefore(input, this);
    updateIngredients();
}

function updateIngredients() {
    allIngredients = document.querySelectorAll('#ingredients-container input[type="text"]');
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