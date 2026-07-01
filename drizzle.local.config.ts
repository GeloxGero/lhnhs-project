import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./src/server/db/schema/",
  out: "./src/server/db/migrations",
  dialect: "postgresql",

  dbCredentials: {
    url: "postgresql://postgres:m9vYjyl5T95orKbD@localhost:5432/i3p",
  },
  migrations: {
    schema: "public",
  },
  breakpoints: false,
});
