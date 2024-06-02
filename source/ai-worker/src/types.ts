import { DateTime, Str } from "@cloudflare/itty-router-openapi";

export const Task = {
	name: new Str({ example: "lorem" }),
	slug: String,
	description: new Str({ required: false }),
	completed: Boolean,
	due_date: new DateTime(),
};

// should have a text field, might have model else default to '@cf/meta/llama-3-8b-instruct'
export const TextGenerationInferenceRequest = {
	text: new Str({ required: true, default: "Give an epic journey story about the Scorching Salsa Stars" }),
	model: new Str({ required: false, default: "@cf/meta/llama-3-8b-instruct" }),
	key: String,
}

// should have an image field, might have model else default to '@cf/runwayml/stable-diffusion-v1-5-inpainting'
export const ImageGenerationInferenceRequest = {
	image: new Str({ required: true, default: "A cup of Scorching Salsa Star" }),
	model: new Str({ required: false, default: "@cf/lykon/dreamshaper-8-lcm" }),
	key: String,
}

export const TextGenerationInferenceResponse = {
	success: Boolean,
	result: {
		answer: String,
	},
}

// result should have the image along with success boolean
export const ImageGenerationInferenceResponse = {
	type: "string",
	contentType: "image/png",
	format: "binary",
};