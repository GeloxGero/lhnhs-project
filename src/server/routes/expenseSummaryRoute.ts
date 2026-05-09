import { Hono } from "hono";
import type { EnvBindings } from "../index";

const app = new Hono<{ Bindings: EnvBindings }>();

app.get("/", (c) => c.json("expense summary get endpoint"));
app.post("/", (c) => c.json("expense summary endpoint"));
app.get("/expenditure", (c) => c.json('expense summary \"summary\" endpoint'));

export default app;
