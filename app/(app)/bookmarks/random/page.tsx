"use server";

import { eq, desc, sql } from "drizzle-orm";
import { db, dbNew } from "@/db";
import { Bookmarks } from "@/components/Bookmarks";
import { bookmarks } from "@/schema";
import { Nothing } from "@/components/DefaultViews/Nothing";

export default async function Page() {
  const random = dbNew
    .select()
    .from(bookmarks)
    .where(eq(bookmarks.archived, 0))
    .orderBy(sql`RANDOM()`)
    .limit(10)
    .as("random");

  const list = await dbNew.select().from(random).orderBy(desc(random.date));

  const allLists = await dbNew.query.lists.findMany();

  if (!list.length) {
    return <h1>Nothing Here!</h1>;
  }

  return (
    <div className="divide-y">
      <h1>Random bookmarks</h1>
      {list?.length ? (
        <Bookmarks bookmarks={list} allLists={allLists} />
      ) : (
        <Nothing />
      )}
    </div>
  );
}
