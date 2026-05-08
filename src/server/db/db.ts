import { drizzle } from "drizzle-orm/d1";
import type { D1Database } from "@cloudflare/workers-types";
import * as schema from "./schema/indexSchema";

export const getDb = (binding: D1Database) => {
  return drizzle(binding, { schema });
};
