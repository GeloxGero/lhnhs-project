import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "./schema/indexSchema";

export const getDb = (connectionString: string) => {
  return drizzle(connectionString, { schema });
};
