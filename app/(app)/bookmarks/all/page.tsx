"use server";

import { eq, desc } from "drizzle-orm";
import { dbNew } from "@/db";
import { Bookmarks } from "@/components/Bookmarks";
import { bookmarks } from "@/schema";
import { Nothing } from "@/components/DefaultViews/Nothing";

// @invariant Non-"Archived" pages should not show archived bookmarks

export default async function Page() {
  const list = await dbNew.query.bookmarks.findMany({
    with: { bookmarksToLists: { with: { list: true } } },
    where: eq(bookmarks.archived, 0),
    orderBy: [desc(bookmarks.date)],
  });

  const allLists = await dbNew.query.lists.findMany();

  console.log(JSON.stringify(list, null, 4));

  return (
    <div className="divide-y">
      <h1 className="p-2">All bookmarks</h1>
      {list?.length ? (
        <Bookmarks bookmarks={list} allLists={allLists} />
      ) : (
        <Nothing />
      )}
    </div>
  );
}
