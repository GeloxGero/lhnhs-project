import { text, serial, boolean, timestamp } from "drizzle-orm/pg-core";

import { app_schema } from "./indexSchema";

export const user_roles = app_schema.enum("role", [
  "user",
  "admin",
  "moderator",
]);

export const users = app_schema.table("users", {
  id: serial("id").primaryKey(),
  name: text("name"),
  email: text("email").notNull().unique(),
  passwordHash: text("password_hash").notNull(),

  role: user_roles("role").notNull().default("user"),
  isActive: boolean().notNull().default(false),
  isEmailVerified: boolean().notNull().default(false),

  createdAt: timestamp().defaultNow(),
  updatedAt: timestamp().defaultNow(),
});
