"use server";

import { eq } from "drizzle-orm";
import { dbNew } from "../../../db";
import { bookmarks, lists, bookmarksToLists } from "../../../schema";
import { Bookmarks } from "../../../components/Bookmarks";

export default async function Page({ params }) {
  const { id } = params;

  const list = dbNew.select().from(lists).where(eq(lists.id, id)).get();

  const listBookmarks = await dbNew
    // @ts-ignore
    .select(bookmarks)
    .from(bookmarksToLists)
    .leftJoin(bookmarks, eq(bookmarksToLists.bookmarkId, bookmarks.id))
    .leftJoin(lists, eq(bookmarksToLists.listId, lists.id))
    .where(eq(lists.id, id));

  const allLists = await dbNew.query.lists.findMany();

  //console.log({ listBookmarks: JSON.stringify(listBookmarks, null, 4) });

  return (
    <div>
      <h1>{list.title}</h1>
      <Bookmarks
        bookmarks={listBookmarks}
        allLists={allLists}
        hasError={false}
      />
    </div>
  );
}
