import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./src/server/db/schema/",
  out: "./src/server/db/migrations",
  dialect: "postgresql",

  dbCredentials: {
    url: "postgresql://postgres:vZuAmeigjHTVRgfXGWuua9a9gF3Eijz3idMqjmSkETGxzHC69d@localhost:5432/lhnhs-local",
  },
  migrations: {
    schema: "public",
  },
  breakpoints: false,
});
