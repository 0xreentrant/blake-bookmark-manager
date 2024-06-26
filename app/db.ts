import { config } from "dotenv";

import { sql } from "@vercel/postgres";
import { drizzle as drizzlePostgres } from "drizzle-orm/vercel-postgres";

import * as schema from "@/schema";

/*
 * Drizzle + vercel-postgres
 */

config({ path: ".env.development.local" });
const db = drizzlePostgres(sql, { schema });

export { db };
