import sqlite3 from "sqlite3";
import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import * as schema from "./schema";

/*
 * sqlite3
 */
const db = new sqlite3.Database("./bookmarks.db");

/*
 * Drizze + better-sqlite3
 */
const sqlite = new Database("./bookmarks.db");

// from: https://blog.stackademic.com/type-typeof-import-users-users-desktop-project-src-db-schema-has-no-properties-in-common-with-76924a22429a
const dbNew = drizzle(sqlite, { schema });

export { db, dbNew };
