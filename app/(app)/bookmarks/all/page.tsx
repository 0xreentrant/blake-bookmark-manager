"use server";

import { eq, desc } from "drizzle-orm";
import { db } from "@/db";
import { Bookmarks } from "@/components/Bookmarks";
import { bookmarks } from "@/schema";
import { Nothing } from "@/components/DefaultViews/Nothing";
import { PageHeading } from "@/components/Type/PageHeading";

// @invariant Non-"Archived" pages should not show archived bookmarks

export default async function Page() {
  const list = await db.query.bookmarks.findMany({
    with: { bookmarksToLists: { with: { list: true } } },
    where: eq(bookmarks.archived, 0),
    orderBy: [desc(bookmarks.date)],
  });

  const allLists = await db.query.lists.findMany();

  //console.log(JSON.stringify(list, null, 4));

  return (
    <>
          <PageHeading>All bookmarks</PageHeading>
      {list?.length ? (
        <Bookmarks bookmarks={list} allLists={allLists} />
      ) : (
        <Nothing />
      )}
    </>
  );
}
