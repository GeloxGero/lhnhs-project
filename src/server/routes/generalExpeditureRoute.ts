import { Hono } from "hono";
import type { EnvBindings } from "../index.ts";
import { getDb } from "../db/db.ts";
import {
  general_expenditure,
  type NewGeneralExpenditure,
  type GetGeneralExpenditure,
} from "../db/schema/generalExpenditureSchema.ts";

const app = new Hono<{ Bindings: EnvBindings }>();

app.get("/", (c) => c.json("general expenditure get endpoint"));
app.post("/", (c) => c.json("general expenditure endpoint"));
app.get("/expenditure", (c) =>
  c.json('general expenditure "expenditure" endpoint'),
);

app.post("/batch_import", async (c) => {
  const db = getDb(c.env.DB);
  const { data } = await c.req.json();

  return c.json({ message: "batch_import api reached", data: data });
});

export default app;
