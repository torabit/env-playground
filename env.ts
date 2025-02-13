import { loadEnvConfig } from "@next/env";
import { z } from "zod";

export type Schema = z.infer<typeof schema>;

const schema = z.object({
	NODE_ENV: z
		.union([
			z.literal("development"),
			z.literal("test"),
			z.literal("production"),
		])
		.default("development"),
	APP_ENV: z
		.union([z.literal("sandbox"), z.literal("qa"), z.literal("production")])
		.default("production"),

	// for client and server
	NEXT_PUBLIC_SITE_URL: z.string().url(),
});

export function config() {
	const { combinedEnv } = loadEnvConfig(process.cwd());
	const res = schema.safeParse(combinedEnv);

	if (res.error) {
		console.error("\x1b[31m%s\x1b[0m", "[Errors] environment variables");
		console.error(JSON.stringify(res.error.errors, null, 2));
		process.exit(1);
	}
}
