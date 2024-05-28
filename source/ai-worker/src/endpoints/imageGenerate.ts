import {
    OpenAPIRoute,
    OpenAPIRouteSchema,
} from "@cloudflare/itty-router-openapi";
import { ImageGenerationInferenceRequest, ImageGenerationInferenceResponse } from "../types";

export class imageGenerate extends OpenAPIRoute {
    static schema: OpenAPIRouteSchema = {
        tags: ["ImageGeneration"],
        summary: "Create an Image from a text, and a model",
        requestBody: ImageGenerationInferenceRequest,
        responses: {
            "200": {
                description: "Returns the created image",
                schema: {
                    ImageGenerationInferenceResponse,
                },
            },
            "400": {
                description: "Bad Request",
                schema: {
                    success: Boolean,
                    error: String,
                },
            },
            "401":{
                description: "Unauthorized",
                schema: {
                    success: Boolean,
                    error: String,
                }
            }
        },
    };

    async handle(
        request: Request,
        env: any,
        context: any,
        data: Record<string, any>
    ) {
        try {
            const { image, model, key } = data.body;

            // Check if the authorization header is correct
            if (key !== env.API_KEY) {
                throw new Error("Invalid authorization key");
            }

            let prompt = "An image of the drink "+image+" on a wooden table";


            // Prepare the input for image generation
            const inputs = {
                prompt: image
            };

            // Perform image generation using the provided inputs
            const generatedImage = await env.AI.run(
                model,
                inputs
            );

            return new Response(generatedImage, {
                status: 200,
                headers: { "Content-Type": "image/png" },
            });
        } catch (error) {
            let errorResponse;
            let statusCode;

            if (error.message === "Authorization header is missing" || error.message === "Invalid authorization key") {
                errorResponse = {
                    success: false,
                    error: "Unauthorized",
                    message: error.message,
                };
                statusCode = 401;
            } else {
                errorResponse = {
                    success: false,
                    error: error.message,
                };
                statusCode = 400;
            }

            return new Response(JSON.stringify(errorResponse), {
                status: statusCode,
                headers: {"Content-Type": "application/json"},
            });
        }

    }
}