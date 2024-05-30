"use server";

import { eq, desc } from "drizzle-orm";
import { dbNew } from "@/db";
import { bookmarks, lists, bookmarksToLists } from "@/schema";
import { List } from "./List";

export default async function Page({ params }) {
  const { id } = params;

  const allLists = await dbNew.query.lists.findMany();

  let listBookmarks = await dbNew.query.lists.findFirst({
    with: {
      bookmarksToLists: {
        columns: { bookmarkId: false, listId: false },
        with: {
          //bookmark: true,
          bookmark: {
            with: {
              bookmarksToLists: {
                columns: { bookmarkId: false },
              },
            },
          },
        },
      },
    },
    where: eq(lists.id, id),
  });

  console.log(JSON.stringify(listBookmarks, null, 4));

  const list = { id: listBookmarks.id, title: listBookmarks.title };

  listBookmarks = listBookmarks.bookmarksToLists.map((b) => ({
    ...b.bookmark,
  }));

  return <List list={list} bookmarks={listBookmarks} lists={allLists} />;
}