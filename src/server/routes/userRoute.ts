import { Hono } from "hono";

const app = new Hono();

app.get("/", (c) => c.json("users get endpoint"));
app.post("/", (c) => c.json("users post endpoint"));
app.get("/email", (c) => c.json("users get email endpoint"));

export default app;
