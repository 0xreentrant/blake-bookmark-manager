import { sql } from "@vercel/postgres";
import { drizzle as drizzlePostgres } from "drizzle-orm/vercel-postgres";
import { config } from "dotenv";

import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import * as schema from "./schema";

/*
 * Drizzle + vercel-postgres
 */

config({ path: ".env.development.local" });
const db = drizzlePostgres(sql, {schema});

/*
 * Drizze + better-sqlite3
 */
const sqlite = new Database("./bookmarks.db");

// from: https://blog.stackademic.com/type-typeof-import-users-users-desktop-project-src-db-schema-has-no-properties-in-common-with-76924a22429a
const dbOld = drizzle(sqlite, { schema });

export { dbOld, db };
