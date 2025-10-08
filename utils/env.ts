import { z } from "zod";

const envSchema = z.object({
	API_URL: z
		.string()
		.url()
		.transform((url) => (url.endsWith("/") ? url.slice(0, -1) : url)),
	BASIC_AUTH_USERNAME: z.string().optional(),
	BASIC_AUTH_PASSWORD: z.string().optional(),
	isDEV: z.enum(["True", "False"]).transform((v) => v === "True"),
});

const envVariables = {
	API_URL: process.env.NEXT_PUBLIC_API_URL,
	BASIC_AUTH_USERNAME: process.env.NEXT_PUBLIC_BASIC_AUTH_USERNAME,
	BASIC_AUTH_PASSWORD: process.env.NEXT_PUBLIC_BASIC_AUTH_PASSWORD,
	isDEV: process.env.NEXT_PUBLIC_DEV as string | undefined,
};

const parsed = envSchema.safeParse(envVariables);

if (!parsed.success) {
	console.log("parsed", parsed);
	throw new Error("Invalid environment variables", {
		cause: parsed.error.format(),
	});
}

export const env = parsed.data;
