"use server";

import { eq, desc } from "drizzle-orm";
import { dbNew } from "@/db";
import { Bookmarks } from "@/components/Bookmarks";
import { bookmarks } from "@/schema";
import { Nothing } from "@/components/DefaultViews/Nothing";

export default async function Page() {
  const list = await dbNew.query.bookmarks.findMany({
    where: eq(bookmarks.archived, 1),
    orderBy: [desc(bookmarks.date)],
  });

  const allLists = await dbNew.query.lists.findMany();

  return (
    <div className="divide-y">
      <h1>Archived bookmarks</h1>
      {list?.length ? (
        <Bookmarks bookmarks={list} allLists={allLists} />
      ) : (
        <Nothing />
      )}
    </div>
  );
}
