import { Hono } from "hono";

import type { D1Database } from "@cloudflare/workers-types";

type Bindings = {
  DB: D1Database;
};
const app = new Hono<{ Bindings: Bindings }>();

app.get("/", (c) => c.json("users get endpoint"));
app.post("/", (c) => c.json("users post endpoint"));
app.get("/email", (c) => c.json("users get email endpoint"));

export default app;
