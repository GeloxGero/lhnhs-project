import { Hono } from "hono";
import { accessAuth } from "./middleware/auth";
const app = new Hono();

app.use(accessAuth).get("/api/health", (c) => c.json("Healthy! "));

app.get("/favicon.ico", (c) => c.body(null, 204));
export default app;
