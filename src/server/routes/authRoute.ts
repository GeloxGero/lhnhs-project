import { Hono } from "hono";

const app = new Hono();

app.get("/", (c) => c.json("auth get endpoint"));

app.post("/", (c) => c.json("auth post endpoint"));
app.get("/email", (c) => c.json("auth get email endpoint"));

export default app;
