import { pgSchema } from "drizzle-orm/pg-core";

export * from "./usersSchema";
export * from "./generalExpenditureSchema";

export const app_schema = pgSchema("app_schema");
