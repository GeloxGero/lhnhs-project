import {
  text,
  pgSchema,
  serial,
  boolean,
  timestamp,
} from "drizzle-orm/pg-core";

export const users_schema = pgSchema("users_schema");
export const roles = users_schema.enum("role", ["user", "admin", "moderator"]);

export const users = users_schema.table("users", {
  id: serial("id").primaryKey(),
  name: text("name"),
  email: text("email").notNull().unique(),
  passwordHash: text("password_hash").notNull(),

  role: roles("role").notNull().default("user"),
  isActive: boolean().notNull().default(false),
  isEmailVerified: boolean().notNull().default(false),

  createdAt: timestamp().defaultNow(),
  updatedAt: timestamp().defaultNow(),
});
