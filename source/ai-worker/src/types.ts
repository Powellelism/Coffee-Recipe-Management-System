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
	text: String,
	model: new Str({ required: false, default: "@cf/meta/llama-3-8b-instruct" }),
	key: String,
}

// should have an image field, might have model else default to '@cf/runwayml/stable-diffusion-v1-5-inpainting'
export const ImageGenerationInferenceRequest = {
	image: String,
	model: new Str({ required: false, default: "@cf/runwayml/stable-diffusion-v1-5-inpainting" }),
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