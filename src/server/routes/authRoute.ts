import { Hono } from "hono";
import { getDb } from "../db/db.ts";
import { users } from "../db/schema/usersSchema.ts";

import type { EnvBindings } from "../index.ts";
import { generateToken, hashPassword, verifyPassword } from "../helpers.ts";
import { deleteCookie, setCookie } from "hono/cookie";
import { verify } from "hono/jwt";

const app = new Hono<{ Bindings: EnvBindings }>();

app.get("/", (c) => c.json("auth get endpoint"));

app.post("/", (c) => c.json("auth post endpoint"));

app.get("/email", (c) => c.json("auth get email endpoint"));

app.post("/login", async (c) => {
  const db = getDb(c.env.HYPERDRIVE.connectionString);
  const { email, password } = await c.req.json();

  console.log("Logging in");
  if (!email || !password)
    return c.json({ error: "All fields are required!" }, 400);

  try {
    const user = await db.query.users.findFirst({
      where: (users, { eq }) => eq(users.email, email),
    });
    if (!user)
      return c.json({ error: `No user with email: ${email}found!` }, 404);

    const match = await verifyPassword(password, user.passwordHash);
    if (!match) return c.json({ error: "Invalid password!" }, 401);

    const token = await generateToken(user.id, c.env.JWT_SECRET);

    const isDevelopment = new URL(c.req.url).hostname === "localhost";
    await setCookie(c, "cookie", token, {
      path: "/", //cookie is available to all routes
      secure: !isDevelopment,
      httpOnly: true,
      sameSite: "Lax", //or Strict // or Lax
      maxAge: 1 * 60 * 60, //1 hour
    });

    console.log("Logged in successfully");
    return c.json({ message: "Successful login", user: user.email }, 200);
  } catch (e) {
    return c.json({ error: "Internal server error \\ database error" }, 500);
  }
});

//needs validation logic
//idea is using zod, but hono has build in validation !!!check
//Signs up the user, and then assigns them a token in their cookies
app.post("/signup", async (c) => {
  const db = getDb(c.env.HYPERDRIVE.connectionString);
  const { email, password, confirmpassword } = await c.req.json();

  if (!email || !password || !confirmpassword)
    return c.json({ error: "All fields are required!" }, 400);

  if (password !== confirmpassword)
    return c.json({ error: "Passwords do not match!!" }, 401);

  const hashedPassword = await hashPassword(password);

  const id = crypto.randomUUID();

  try {
    const [users_instance] = await db
      .insert(users)
      .values({ email: email, passwordHash: hashedPassword })
      .returning({ id: users.id });

    const token = await generateToken(users_instance.id, c.env.JWT_SECRET);

    const isDevelopment = new URL(c.req.url).hostname === "localhost";
    setCookie(c, "cookie", token, {
      path: "/", //cookie is available to all routes
      secure: !isDevelopment,
      httpOnly: true,
      sameSite: "Lax", //or Strict or Lax
      maxAge: 1 * 60 * 60, //1 hour
    });

    return c.json(
      {
        message: "User registered successfully",
        user: { id: id, email: email },
      },
      201,
    );
  } catch (error) {
    return c.json({ error: "Internal Server Error" }, 500);
  }
});

app.post("logout", (c) => {
  deleteCookie(c, "cookie", { path: "/" });
  return c.json({ message: "User successfully logged out" }, 200);
});

export default app;
