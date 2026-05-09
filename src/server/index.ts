import { Hono } from "hono";
import { accessAuth } from "./middleware/auth";
import type { D1Database } from "@cloudflare/workers-types";
import userRoute from "./routes/userRoute";
import generalExpenditureRoute from "./routes/generalExpeditureRoute";
import expenseSummaryRoute from "./routes/expenseSummaryRoute";
import authRoute from "./routes/authRoute";

export type EnvBindings = {
  DB: D1Database;
  JWT_SECRET: string;
  ENVIRONMENT: string;
};

const app = new Hono<{ Bindings: EnvBindings }>();

app.route("/api/users", userRoute);
app.route("/api/generalExpenditure", generalExpenditureRoute);
app.route("/api/expenseSummary", expenseSummaryRoute);
app.route("/api/auth", authRoute);

app.use(accessAuth).get("/api/health", (c) => c.json("Healthy! "));

export default app;
