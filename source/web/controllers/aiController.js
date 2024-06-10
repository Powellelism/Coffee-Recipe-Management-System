const axios = require("axios");
//const { post } = require("../routes/api");

/**
 * This function generates a text for a recipe based on a drink name
 * @param request None
 * @param response generated text
 */
exports.generateRecipe = async (request, response) => {
  const { recipeName, category, ingredients } = request.body;

  try {
    const postData = {
      text: "",
      model: "@cf/meta/llama-3-8b-instruct",
      key: process.env.API_KEY,
    };
    switch (category) {
      case "Size":
        postData.text =
          "Pick one from {Tall or Grande or Venti} based on this drink " +
          recipeName +
          ". Then respond with that only";
        break;
      case "Type":
        postData.text =
          "Pick one from {Hot or Cold} based on this drink " +
          recipeName +
          ". Then respond with that only";
        break;
      case "Ingredients":
        postData.text =
          "A list of " +
          recipeName +
          " drink ingredients separated by a comma. Respond with the ingredients only, no more than 8 ingredients.";
        break;
      case "Recipe":
        postData.text =
          "Given the following ingredients: " +
          ingredients +
          ". Give a 3-4 sentences paragraph on how to make a " +
          recipeName;
        break;
    }

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const responseA = await axios.post(
      process.env.API_TEXTGEN_URL,
      postData,
      requestOptions,
    );
    response.status(200).json(responseA.data);
  } catch (error) {
    console.error("Text generation error: ", error);
  }
};

/**
 * This function generates an image for a recipe based on a drink name
 * @param request None
 * @param response generated image URL
 */
exports.generateImage = async (request, response) => {
  const { recipeName } = request.body;

  try {
    const postData = {
      image: "A(n) " + recipeName + " drink with flowers, in a coffee shop",
      model: "@cf/lykon/dreamshaper-8-lcm",
      key: process.env.API_KEY,
    };
    console.log(postData.image);

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const responseB = await axios.post(
      process.env.API_IMGGEN_URL,
      postData,
      requestOptions,
    );
    response.status(200).json(responseB.data);
  } catch (error) {
    console.error("Image generation error: ", error);
  }
};
