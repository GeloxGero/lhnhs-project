import { defineMiddleware } from "astro:middleware";

const publicRoutes = ["/auth/register", "/auth/login", "/auth"];
const ignoredRoutes = ["/_astro", "/favicon.ico", "/logo.png", "/api"];

export const onRequest = defineMiddleware(
  async ({ cookies, url, redirect }, next) => {
    const token = cookies.get("signed-cookie")?.value;

    const isPublicRoute = publicRoutes.some((route) =>
      url.pathname.startsWith(route),
    );

    const isIgnored = ignoredRoutes.some((route) =>
      url.pathname.startsWith(route),
    );

    if (isIgnored) return next();

    if (token && isPublicRoute) {
      return redirect("/");
    }

    // no token + on protected pages → redirect to login
    if (!token && !isPublicRoute) {
      return redirect("/auth/login");
    }

    return next();
  },
);
