const axios = require("axios")

exports.generateRecipe = async (request, response) => {
    const postData = { text: "Give 1 sentence about drink", 
        model: "@cf/meta/llama-3-8b-instruct", 
        key: process.env.API_KEY }; 
    const requestOptions = { method: 'POST', 
        headers: { 'accept': 'application/json', 'Content-Type': 'application/json' }}; 
    const responseA = await axios.post('https://ai.powellelism.site/api/text-generate',postData, requestOptions)
    response.status(200).json(responseA.data)
}