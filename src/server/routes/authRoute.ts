import { Hono } from "hono";
import { getDb } from "../db/db.ts";
import { users } from "../db/schema/usersSchema.ts";

import type { D1Database } from "@cloudflare/workers-types";
import type { EnvBindings } from "../index.ts";
import { generateToken, hashPassword } from "../helpers.ts";
import { generateSignedCookie } from "hono/cookie";

const app = new Hono<{ Bindings: EnvBindings }>();

app.get("/", (c) => c.json("auth get endpoint"));

app.post("/", (c) => c.json("auth post endpoint"));

app.get("/email", (c) => c.json("auth get email endpoint"));

//needs validation logic
//idea is using zod, but hono has build in validation !!!check
//Signs up the user, and then assigns them a token in their cookies
app.post("/signup", async (c) => {
  console.log("console 1");
  const db = getDb(c.env.DB);
  const { email, password, confirmpassword } = await c.req.json();
  console.log("console 2");

  if (!email || !password || !confirmpassword)
    return c.json({ error: "All fields are required!" }, 400);

  if (password !== confirmpassword)
    return c.json({ error: "Passwords do not match!!" });

  const hashedPassword = await hashPassword(password);

  console.log("console 3");
  const id = crypto.randomUUID();

  try {
    const [users_instance] = await db
      .insert(users)
      .values({ id: id, email: id, passwordHash: hashedPassword })
      .returning({ id: users.id });

    const token = await generateToken(users_instance.id);

    console.log("console 4");
    generateSignedCookie("Signed cookie", token, c.env.JWT_SECRET!, {
      path: "/", //cookie is available to all routes
      secure: c.env.ENVIRONMENT === "production",
      httpOnly: true,
      sameSite: "Strict", //or Lax
      maxAge: 1 * 60 * 60, //1 hour
    });

    console.log("console 5");
    return c.json(
      {
        message: "User registered successfully",
        user: { id: id, email: email },
      },
      201,
    );
  } catch (error) {
    console.log(error);
  }
});

export default app;
