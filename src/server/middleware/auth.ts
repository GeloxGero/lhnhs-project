import { createMiddleware } from "hono/factory";
import { jwtVerify, createRemoteJWKSet } from "jose";

export const accessAuth = createMiddleware(async (c, next) => {
  if (c.env.ENVIRONMENT === "development") {
    await next();
  }

  if (!c.env.POLICY_AUD) {
    return c.json({ error: "Missing required audience" }, 403);
  }

  const token = c.req.header("cf-access-jwt-assertion");

  // Check if token exists
  if (!token) {
    return c.json("Missing required CF Access JWT", 403);
  }

  try {
    // Create JWKS from your team domain
    const JWKS = createRemoteJWKSet(
      new URL(`${c.env.CLOUDFLARE_ACCESS_DOMAIN}/cdn-cgi/access/certs`),
    );

    await next();
  } catch (err) {
    const error = err as Error;
    return c.json(`Invalid token: ${error.message}`, 403);
  }
});
