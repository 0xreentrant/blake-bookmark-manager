"use server";

import { eq, desc, sql } from "drizzle-orm";
import { Bookmarks } from "@/components/Bookmarks";
import { bookmarks, lists, bookmarksToLists } from "@/schema";
import { Nothing } from "@/components/DefaultViews/Nothing";
import { PageHeadingSystemList } from "@/components/Type/PageHeadingSystemList";

export default async function Page() {
  const list = await dbNew.query.bookmarks
    .findMany({
      with: { bookmarksToLists: { with: { list: true } } },
      where: eq(bookmarks.archived, 0),
      orderBy: [sql`RANDOM()`],
      limit: 10,
    })
    .then((data) => {
      // sort descending
      return data.sort((a, b) => Number(b.date) - Number(a.date));
    });

  const allLists = await dbNew.query.lists.findMany();

  if (!list?.length) {
    return <h1>Nothing Here!</h1>;
  }

  return (
    <>
      <PageHeadingSystemList>Random bookmarks</PageHeadingSystemList>
      {list?.length ? (
        <Bookmarks bookmarks={list} allLists={allLists} />
      ) : (
        <Nothing />
      )}
    </>
  );
}
