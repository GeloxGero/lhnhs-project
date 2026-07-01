import {
  integer,
  text,
  boolean,
  timestamp,
  numeric,
  serial,
} from "drizzle-orm/pg-core";

import { app_schema } from "./app_schema";

export const general_expenditure = app_schema.table("general_expenditure", {
  id: serial("id").primaryKey(),
  accountCode: text("account_code"),
  accountTitle: text("account_title"),
  activity: text("activity"),
  category: text("category"),
  estimatedCost: numeric("estimated_cost"),
  indicator: text("indicator"),
  kra: text("kra"),
  month: text("month"),
  year: integer("year"),
  purpose: text("purpose"),
  resourcesDescription: text("resources_description"),
  resourcesQuantity: integer("resources_quantity"),
  arCode: serial("ar_code").unique().notNull(),
  verified: boolean("verified").notNull().default(false),
  image_url: text("image_url"),

  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});
