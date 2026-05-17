import {
  integer,
  text,
  boolean,
  timestamp,
  numeric,
  serial,
} from "drizzle-orm/pg-core";

import { app_schema } from "./app_schema";

export const expense_item = app_schema.table("expense_item", {
  id: serial("id").primaryKey(),
  unspc: text("unspc"),
  description: text("description"),
  specification: text("specification"),
  unitOfMeasure: text("unit_of_measure"),
  quantity: integer("quantity"),
  price: numeric("price"),
  total: numeric("total"),
  arCode: integer("ar_code"),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});
