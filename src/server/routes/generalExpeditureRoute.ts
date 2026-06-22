import { Hono } from "hono";
import type { EnvBindings } from "../index.ts";
import { getDb } from "../db/db.ts";
import { general_expenditure } from "../db/schema/generalExpenditureSchema.ts";
import { eq, sum, getTableColumns } from "drizzle-orm";

const app = new Hono<{ Bindings: EnvBindings }>();

app.get("/", (c) => c.json("general expenditure get endpoint"));
app.post("/", (c) => c.json("general expenditure endpoint"));
app.get("/expenditure", (c) =>
  c.json('general expenditure "expenditure" endpoint'),
);

app.get("ar_get_general_expenditure", async (c) => {
  const db = getDb(c.env.HYPERDRIVE.connectionString);
  const arCode = c.req.query("arCode");

  try {
    const expenditure = await db
      .select()
      .from(general_expenditure)
      .where(eq(general_expenditure.arCode, Number(arCode)));
    return c.json(
      {
        message: `General Expenditure for arCode ${arCode}`,
        data: expenditure,
      },
      200,
    );
  } catch (e) {
    return c.json({ message: "Internal server error" }, 500);
  }
});

app.get("/get_by_year", async (c) => {
  const db = getDb(c.env.HYPERDRIVE.connectionString);
  let yearParam: string | undefined = "2024";
  yearParam = c.req.query("year");

  const year = parseInt(yearParam || "2024");

  let expenditures;
  try {
    expenditures = await db
      .select()
      .from(general_expenditure)
      .where(eq(general_expenditure.year, year));
  } catch (e) {
    return c.json({ message: "Internal server error" }, 500);
  } finally {
    return c.json({ message: `General Expeditures`, data: expenditures }, 200);
  }
});

app.post("/batch_import", async (c) => {
  const db = getDb(c.env.HYPERDRIVE.connectionString);
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
