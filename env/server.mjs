import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    /** デプロイかローカルかの変数 */
    NODE_ENV: z
      .union([
        z.literal("development"),
        z.literal("test"),
        z.literal("production"),
      ])
      .default("development"),
    /** デプロイの環境変数 */
    APP_ENV: z
      .union([z.literal("sandbox"), z.literal("qa"), z.literal("production")])
      .default("production"),
  },
});
