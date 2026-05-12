import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "./schema/indexSchema";
import { Client } from "pg";

export const getDb = async (connectionString: string) => {
  const client = new Client({ connectionString: connectionString });
  await client.connect();
  return drizzle(client);
};
