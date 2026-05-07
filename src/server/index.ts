import { Hono } from "hono";
const app = new Hono();

app.get("/api/health", (c) => c.json("Healthy! "));

app.get("/favicon.ico", (c) => c.body(null, 204));
export default app;
