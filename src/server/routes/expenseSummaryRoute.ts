import { Hono } from "hono";
import type { EnvBindings } from "../index";
import { EXPENSE_SUMMARY_MOCK_DATA } from "../mockData";
import { expense_item } from "../db/schema/expenseItemSchema";
import { getDb } from "../db/db";
import { eq, sum, getTableColumns } from "drizzle-orm";

const app = new Hono<{ Bindings: EnvBindings }>();

app.get("/", (c) => c.json("expense summary get endpoint"));
app.post("/", (c) => c.json("expense summary endpoint"));
app.get("/expenditure", (c) => c.json('expense summary \"summary\" endpoint'));

app.get("/ar_get_expenses", async (c) => {
  const db = getDb(c.env.HYPERDRIVE.connectionString);
  const arCode = c.req.query("arCode");

  let expenses;
  try {
    expenses = await db
      .select({...getTableColumns(expense_item), expenseTotal: sum(expense_item.total) })
      .from(expense_item)
      .where(eq(expense_item.arCode, Number(arCode)))
      .groupBy(expense_item.id);
  } catch (e) {
    return c.json({ message: "Internal server error" }, 500);
  } finally {
    return c.json({ message: `General Expenditures`, data: expenses }, 200);
  }
});

app.post("/ar_code_seed", async (c) => {
  const { arCode } = (await c.req.json()) as { arCode: number };
  const db = getDb(c.env.HYPERDRIVE.connectionString);

  if (!arCode) {
    return Response.json({ error: "arCode is required" }, { status: 400 });
  }

  const mockItem =
    EXPENSE_SUMMARY_MOCK_DATA[
      Math.floor(Math.random() * EXPENSE_SUMMARY_MOCK_DATA.length)
    ];

  const data = {
    ...mockItem,
    total: String(mockItem.quantity * Number(mockItem.price)),
    arCode,
  };

  let returnedData;
  try {
    returnedData = await db.insert(expense_item).values(data);
  } catch (e) {
    return c.json({ message: "Erorr" }, 400);
  }

  return c.json({ message: `Seeded 1 item for arCode ${arCode}` }, 201);
});

export default app;
