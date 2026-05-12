import { Hono } from "hono";
import type { EnvBindings } from "../index.ts";

const app = new Hono<{ Bindings: EnvBindings }>();

app.get("/", (c) => c.json("general expenditure get endpoint"));
app.post("/", (c) => c.json("general expenditure endpoint"));
app.get("/expenditure", (c) =>
  c.json('general expenditure "expenditure" endpoint'),
);

app.post("/batch_import", (c) => {
  return c.json({ message: "Api reached" });
});

export default app;
