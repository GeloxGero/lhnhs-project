import { Hono } from "hono";
import { accessAuth } from "./middleware/auth";
import type { D1Database } from "@cloudflare/workers-types";

type Bindings = {
  DB: D1Database;
};

const app = new Hono<{ Bindings: Bindings }>();

app.use(accessAuth).get("/api/health", (c) => c.json("Healthy! "));

app.get("/favicon.ico", (c) => c.body(null, 204));
export default app;
