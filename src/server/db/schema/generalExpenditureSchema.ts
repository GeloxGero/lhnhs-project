import {
  integer,
  text,
  boolean,
  timestamp,
  numeric,
  serial,
  pgSchema,
} from "drizzle-orm/pg-core";

const general_expenditure_schema = pgSchema("general_expenditure_schema");

export const general_expenditure = general_expenditure_schema.table(
  "general_expenditure",
  {
    id: serial().primaryKey(),
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
    arCode: text("ar_code"),
    isActive: boolean().notNull().default(true),

    createdAt: timestamp().defaultNow(),
    updatedAt: timestamp().defaultNow(),
  },
);
