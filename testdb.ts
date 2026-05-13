import { Client } from "pg";

const client = new Client({
  connectionString:
    "postgresql://postgres:vZuAmeigjHTVRgfXGWuua9a9gF3Eijz3idMqjmSkETGxzHC69d@localhost:5432/lhnhs-local",
});

client
  .connect()
  .then(() => {
    console.log("Connected successfully");
    return client.end();
  })
  .catch((err) => console.error("Connection failed:", err));
