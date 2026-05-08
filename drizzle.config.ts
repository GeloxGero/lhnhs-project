import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "sqlite", // 'mysql' | 'sqlite' | 'turso' | 'postregsql'
  schema: "./src/server/db/schema",
  out: "./src/server/db/migrations",
  driver: "d1-http",
});
