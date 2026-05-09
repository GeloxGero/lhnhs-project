import { Hono } from "hono";

import type { D1Database } from "@cloudflare/workers-types";
import type { EnvBindings } from "../index.ts";

const app = new Hono<{ Bindings: EnvBindings }>();

app.get("/", (c) => c.json("users get endpoint"));
app.post("/", (c) => c.json("users post endpoint"));
app.get("/email", (c) => c.json("users get email endpoint"));

export default app;
