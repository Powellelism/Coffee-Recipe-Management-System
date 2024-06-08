const axios = require("axios");
const { post } = require("../routes/api");

exports.generateRecipe = async (request, response) => {
    //const drinkName = request.body
    const {recipeName, category} = request.body;
    const postData = {
        text: "",
        model: "@cf/meta/llama-3-8b-instruct",
        key: process.env.API_KEY
    };
    switch (category) {
        case "Size":
            postData.text = "Pick one from {Tall or Grande or Venti}. Then respond with that only";
            break;
        case "Type":
            postData.text = "Pick one from {Hot or Cold}. Then respond with that only";
            break;
        case "Ingredients":
            postData.text = "A list of " + recipeName + " ingredients separated by a comma. Respond with the ingredients only, no more than 8 ingredients.";
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