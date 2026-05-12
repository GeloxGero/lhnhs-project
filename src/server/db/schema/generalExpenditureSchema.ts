import { sqliteTable, integer, text, real } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";

export const general_expenditure = sqliteTable("general_expenditure", {
  id: text("id").primaryKey(),
  accountCode: text("account_code"),
  accountTitle: text("account_title"),
  activity: text("activity"),
  category: text("category"),
  estimatedCost: real("estimated_cost"),
  indicator: text("indicator"),
  kra: text("kra"),
  month: text("month"),
  year: integer("year"),
  purpose: text("purpose"),
  resourcesDescription: text("resources_description"),
  resourcesQuantity: integer("resources_quantity"),
  arCode: text("ar_code"),
  isActive: integer("is_active", { mode: "boolean" }).notNull().default(true),

  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .default(sql`(unixepoch())`),
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .notNull()
    .default(sql`(unixepoch())`),
});

export type NewGeneralExpenditure = typeof general_expenditure.$inferInsert;
export type GetGeneralExpenditure = typeof general_expenditure.$inferSelect;
