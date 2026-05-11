//dependency imports
import { Hono } from "hono";
import type { D1Database } from "@cloudflare/workers-types";
import { cors } from "hono/cors";
import { logger } from "hono/logger";

//user imports
import { accessAuth, jwtAuth } from "./middleware/auth";
import { localCors } from "./middleware/cors";

//route imports
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

//middlewares
app.use("/api/*", localCors, accessAuth, logger());
app.use("/api/protected/*", jwtAuth);

app.route("/api/protected/users", userRoute);
app.route("/api/protected/generalExpenditure", generalExpenditureRoute);
app.route("/api/protected/expenseSummary", expenseSummaryRoute);
app.route("/api/auth", authRoute);

app.get("/api/health", (c) => c.json("Healthy! "));

export default app;
