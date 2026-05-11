import { createMiddleware } from "hono/factory";
import { createRemoteJWKSet } from "jose";
import { verify } from "hono/jwt";
import { getCookie } from "hono/cookie";

export const accessAuth = createMiddleware(async (c, next) => {
  if (c.env.ENVIRONMENT === "development") {
    await next();
  } else {
    console.log(c.env.ENVIRONMENT);
    if (!c.env.POLICY_AUD) {
      console.log("Policy_AUD error");
      return c.json({ error: "Missing required audience" }, 403);
    }

    const token = c.req.header("cf-access-jwt-assertion");

    // Check if token exists
    if (!token) {
      console.log("no token error");
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
      console.log("error parsing token");
      return c.json(`Invalid token: ${error.message}`, 403);
    }
  }
});

export const jwtAuth = createMiddleware(async (c, next) => {
  const token = getCookie(c, "cookie");

  if (!token) {
    return c.json({ message: "Unauthorized!" }, 401);
  }

  try {
    const payload = await verify(token, c.env.JWT_SECRET, "HS256");
    c.set("user", payload);
    return next();
  } catch (e) {
    return c.json({ error: "Invalid or expired token" }, 401);
  }
});
