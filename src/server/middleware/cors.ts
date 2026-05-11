import { createMiddleware } from "hono/factory";
import { cors } from "hono/cors";

export const localCors = createMiddleware(async (c, next) => {
  if (c.env.ENVIRONMENT === "development") {
    const corsHandler = cors({
      origin: "http://localhost:4321",
      credentials: true,
    });

    return corsHandler(c, next);
  }

  return next();
});
