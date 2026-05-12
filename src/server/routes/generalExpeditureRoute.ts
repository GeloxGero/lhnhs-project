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

app.get("/get_by_year", (c) => {
  const year = c.req.query("year");

  const db = getDb(c.env.DB);

  return c.json({ message: "yeah" });
});

app.post("/batch_import", async (c) => {
  const db = getDb(c.env.DB.connectionString);
  const { data } = await c.req.json();

  const ids = await db
    .insert(general_expenditure)
    .values(data)
    .returning({ id: general_expenditure.id });

  return c.json(
    {
      message: `successfully imported ${ids.length} rows`,
    },
    201,
  );
});

export default app;
