const axios = require("axios");
const { post } = require("../routes/api");

exports.generateRecipe = async (request, response) => {
    const {recipeName, category, ingredients} = request.body;

    const postData = {
        text: "",
        model: "@cf/meta/llama-3-8b-instruct",
        key: process.env.API_KEY
    };
    switch (category) {
        case "Size":
            postData.text = "Pick one from {Tall or Grande or Venti} based on this drink " + recipeName + ". Then respond with that only";
            break;
        case "Type":
            postData.text = "Pick one from {Hot or Cold} based on this drink " + recipeName + ". Then respond with that only";
            break;
        case "Ingredients":
            postData.text = "A list of " + recipeName + " ingredients separated by a comma. Respond with the ingredients only, no more than 8 ingredients.";
            break;
        case "Recipe":
            postData.text = "Given the following ingredients: " + ingredients + ". Give a 3-4 sentences paragraph on how to make a " + recipeName;
            break;
    };
    const requestOptions = {
        method: 'POST',
        headers: {
            'accept': 'application/json',
            'Content-Type': 'application/json'
        }
    };
    const responseA = await axios.post('https://ai.powellelism.site/api/text-generate', postData, requestOptions);

    response.status(200).json(responseA.data)
}