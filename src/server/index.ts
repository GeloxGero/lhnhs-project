//dependency imports
import { Hono } from "hono";
import type { Hyperdrive } from "@cloudflare/workers-types";
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
  HYPERDRIVE: Hyperdrive;
  JWT_SECRET: string;
  ENVIRONMENT: string;
};

const app = new Hono<{ Bindings: EnvBindings }>();

//middlewares
app.use("/api/*", localCors, accessAuth, logger());
app.use("/api/protected/*", jwtAuth);

app.route("/api/protected/users", userRoute);
app.route("/api/protected/general_expenditure", generalExpenditureRoute);
app.route("/api/protected/expense_summary", expenseSummaryRoute);
app.route("/api/auth", authRoute);

app.get("/api/health", (c) => c.json("Healthy! "));

export default app;
