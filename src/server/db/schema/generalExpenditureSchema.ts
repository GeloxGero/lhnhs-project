import { sqliteTable, integer, text } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";

export const general_expenditure = sqliteTable("general_expenditure", {
  id: text("id").primaryKey(),
  accountCode: text("account_code"),
  accountTitle: text("account_title"),
  activity: text("activity"),
  category: text("category"),
  estimatedCost: integer("estimated_cost"),
  indicator: text("indicator"),
  kra: text("kra"),
  month: text("month"),
  purpose: text("purpose"),
  resourcesDescription: text("resources_description"),
  resourcesQuantity: integer("resources_quantity"),

  isActive: integer("is_active", { mode: "boolean" }).notNull().default(true),

  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .default(sql`(unixepoch())`),
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .notNull()
    .default(sql`(unixepoch())`),
});
