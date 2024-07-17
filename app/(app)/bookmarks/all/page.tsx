"use server";

import { and, eq, desc } from "drizzle-orm";
import { db } from "@/lib/db";
import { Bookmarks } from "@/components/Bookmarks";
import { bookmarks } from "@/lib/schema";
import { Nothing } from "@/components/DefaultViews/Nothing";
import { PageHeading } from "@/components/Type/PageHeading";
import { validateRequest } from "@/lib/auth";

// @invariant Non-"Archived" pages should not show archived bookmarks

export default async function Page() {
  const { user } = await validateRequest();
  const list = await db.query.bookmarks.findMany({
    with: { bookmarksToLists: { with: { list: true } } },
    where: and(eq(bookmarks.archived, 0), eq(bookmarks.userId, user.id)),
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
