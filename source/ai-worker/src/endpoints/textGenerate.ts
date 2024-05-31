import {
    OpenAPIRoute,
    OpenAPIRouteSchema,
} from "@cloudflare/itty-router-openapi";

import { TextGenerationInferenceRequest, TextGenerationInferenceResponse } from "../types";

export class textGenerate extends OpenAPIRoute {
    static schema: OpenAPIRouteSchema = {
        tags: ["TextGeneration"],
        summary: "Generate text using a model available from cloudflare",
        requestBody: TextGenerationInferenceRequest,
        responses: {
            "200": {
                description: "Returns the generated text",
                schema: TextGenerationInferenceResponse,
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
                },
            },
        },
    };

    async handle(
        request: Request,
        env: any,
        context: any,
        data: Record<string, any>
    ) {
        try {
            const { text, model, key } = data.body;

            // Check if key matches the predefined key in the environment variables
            if (key !== env.API_KEY) {
                throw new Error("Invalid authorization key");
            }


            const messages = [
                { role: "system", content: "You are a friendly assistant" },
                {
                    role: "user",
                    content: text,
                },
            ];
            const response = await env.AI.run(model, { messages });

            return Response.json(response);

        } catch (error) {
            let errorResponse;
            let statusCode;

            if (error.message === "Authorization header is missing" || error.message === "Invalid authorization key") {
                errorResponse = {
                    success: false,
                    error: "Unauthorized",
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
                headers: { "Content-Type": "application/json" },
            });
        }
    }
}