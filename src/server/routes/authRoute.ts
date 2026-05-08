import { Hono } from "hono";
import { getDb } from "../db/db.ts";
import { users } from "../db/schema/usersSchema.ts";

import type { D1Database } from "@cloudflare/workers-types";
import { generateToken } from "../helpers.ts";
import { generateSignedCookie } from "hono/cookie";

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
  const id = crypto.randomUUID();

  try {
    const [users_instance] = await db
      .insert(users)
      .values({ id: id, email: id, passwordHash: hashedPassword })
      .returning({ id: users.id });

    const token = await generateToken(users_instance.id);

    await generateSignedCookie(
      "Signed cookie",
      token,
      process.env.JWT_SECRET!,
      {
        path: "/", //cookie is available to all routes
        secure: process.env.NODE_ENV === "production",
        httpOnly: true,
        sameSite: "Strict", //or Lax
        maxAge: 1 * 60 * 60, //1 hour
      },
    );
    return c.json(
      {
        message: "User registered successfully",
        user: { id: id, email: email },
      },
      201,
    );
  } catch (error) {}
});

export default app;
