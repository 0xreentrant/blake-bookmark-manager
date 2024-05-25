import "dotenv/config";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "sqlite",
  dbCredentials: {
    url: "./bookmarks.db",
  },
  schema: "./app/schema.ts",
  out: "./migrations",
});
