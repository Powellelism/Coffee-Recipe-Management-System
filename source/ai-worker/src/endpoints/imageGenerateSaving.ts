import {
    OpenAPIRoute,
    OpenAPIRouteSchema,
} from "@cloudflare/itty-router-openapi";
import { ImageGenerationInferenceRequest, ImageGenerationInferenceResponse } from "../types";

export class imageGenerateSaving extends OpenAPIRoute {
    static schema: OpenAPIRouteSchema = {
        tags: ["ImageGeneration"],
        summary: "Generate an image from text, save to R2, and return the URL",
        requestBody: ImageGenerationInferenceRequest,
        responses: {
            "200": {
                description: "Returns the URL of the created image",
                schema: {
                    url: String,
                },
            },
            "400": {
                description: "Bad Request",
                schema: {
                    success: Boolean,
                    error: String,
                },
            },
            "401": {
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

            // Verify authorization key
            if (key !== env.API_KEY) {
                throw new Error("Invalid authorization key");
            }

            let prompt = "An image of the drink " + image + " on a wooden table";

            // Prepare the input for image generation
            const inputs = {
                prompt: image
            };

            // Generate the image using the provided model
            const generatedImageStream = await env.AI.run(
                model,
                inputs
            );

            // Convert the readable stream to a buffer
            const generatedImageBuffer = await new Response(generatedImageStream).arrayBuffer();

            // Convert generated image to a format suitable for R2 storage
            const filename = `${Date.now()}-generated.png`;
            await env.BUCKET.put(filename, generatedImageBuffer, {
                httpMetadata: { contentType: 'image/png' }
            });

            // Construct public URL for the stored image
            const publicUrl = `https://r2.powellelism.site/${filename}`;

            // Return the URL of the generated and saved image
            return new Response(JSON.stringify({ url: publicUrl }), {
                status: 200,
                headers: { "Content-Type": "application/json" }
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
