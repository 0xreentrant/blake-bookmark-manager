"use server";

import { eq, desc, sql } from "drizzle-orm";
import { db, dbNew } from "../../db";
import { Bookmarks } from "../Bookmarks";
import { bookmarks } from "../../schema";

export default async function Page() {
  const random = dbNew
    .select()
    .from(bookmarks)
    .where(eq(bookmarks.archived, 0))
    .orderBy(sql`RANDOM()`)
    .limit(10)
    .as("random");
  const sorted = await dbNew.select().from(random).orderBy(desc(random.date));

  return <Bookmarks bookmarks={sorted} hasError={false} />;
}
