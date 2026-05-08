import { Hono } from "hono";

const app = new Hono();

app.get("/", (c) => c.json("general expenditure get endpoint"));
app.post("/", (c) => c.json("general expenditure endpoint"));
app.get("/expenditure", (c) =>
  c.json('general expenditure "expenditure" endpoint'),
);

export default app;
