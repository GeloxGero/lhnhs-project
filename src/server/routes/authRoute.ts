import { Hono } from "hono";
import { getDb } from "../db/db.ts";
import { users } from "../db/schema/usersSchema.ts";

import type { D1Database } from "@cloudflare/workers-types";

type Bindings = {
  DB: D1Database;
};

const app = new Hono<{ Bindings: Bindings }>();

app.get("/", (c) => c.json("auth get endpoint"));

app.post("/", (c) => c.json("auth post endpoint"));

app.get("/email", (c) => c.json("auth get email endpoint"));

//needs validation logic
//idea is using zod, but hono has build in validation !!!check
app.post("/signup", async (c) => {
  const db = getDb(c.env.DB);
  const { email, password } = await c.req.json();
  const hashedPassword = await Bun.password.hash(password);

  await db.insert(users).values({ email: email, passwordHash: hashedPassword });

  try {
  } catch {}
});

export default app;
