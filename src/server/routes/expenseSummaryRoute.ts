import { Hono } from "hono";

const app = new Hono();

app.get("/", (c) => c.json("expense summary get endpoint"));
app.post("/", (c) => c.json("expense summary endpoint"));
app.get("/expenditure", (c) => c.json('expense summary \"summary\" endpoint'));

export default app;
