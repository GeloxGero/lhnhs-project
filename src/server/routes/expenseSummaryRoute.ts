import { Hono } from "hono";
import type { EnvBindings } from "../index";
import { EXPENSE_SUMMARY_MOCK_DATA } from "../mockData";
import { expense_item } from "../db/schema/expenseItemSchema";
import { getDb } from "../db/db";

const app = new Hono<{ Bindings: EnvBindings }>();

app.get("/", (c) => c.json("expense summary get endpoint"));
app.post("/", (c) => c.json("expense summary endpoint"));
app.get("/expenditure", (c) => c.json('expense summary \"summary\" endpoint'));

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

  await db.insert(expense_item).values(data);

  return c.json({ message: `Seeded 1 item for arCode ${arCode}` }, 201);
});

export default app;
