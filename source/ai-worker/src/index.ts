import { OpenAPIRouter } from "@cloudflare/itty-router-openapi";
import { imageGenerate } from "./endpoints/imageGenerate";
import { textGenerate } from "./endpoints/textGenerate";

export const router = OpenAPIRouter({
	docs_url: "/",
});

router.post("/api/text-generate/", textGenerate);
router.post("/api/image-generate/", imageGenerate);

// 404 for everything else
router.all("*", () =>
	Response.json(
		{
			success: false,
			error: "Route not found",
		},
		{ status: 404 }
	)
);

export default {
	fetch: router.handle,
};
