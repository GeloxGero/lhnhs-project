import { Hono } from "hono";
import { accessAuth } from "./middleware/auth";
import type { D1Database } from "@cloudflare/workers-types";
import userRoute from "./routes/userRoute";
import generalExpenditureRoute from "./routes/generalExpeditureRoute";
import expenseSummaryRoute from "./routes/expenseSummaryRoute";

type Bindings = {
  DB: D1Database;
};

const app = new Hono<{ Bindings: Bindings }>();

app.route("/api/users", userRoute);
app.route("/api/generalExpenditure", generalExpenditureRoute);
app.route("/api/expenseSummary", expenseSummaryRoute);

app.use(accessAuth).get("/api/health", (c) => c.json("Healthy! "));

export default app;
