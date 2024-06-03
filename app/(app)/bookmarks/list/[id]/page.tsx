"use server";

import { eq, desc } from "drizzle-orm";
import { createSelectSchema } from "drizzle-zod";
import { dbNew } from "@/db";
import { bookmarks, lists } from "@/schema";
import { List } from "./List";

// @invariant Lists should not show archived bookmarks

export default async function Page({ params }) {
  const { id } = params;

  const allLists = await dbNew.query.lists.findMany();

  const listWithBookmarks = await dbNew.query.lists.findFirst({
    with: {
      bookmarksToLists: {
        with: {
          bookmark: {
            with: {
              bookmarksToLists: {
                with: { list: true },
              },
            },
          },
        },
      },
    },
    where: eq(lists.id, id),
  });

  const bookmarksOnList = listWithBookmarks.bookmarksToLists
    .map((b) => ({
      ...b.bookmark,
    }))
    .sort((a, b) => Number(b.date) - Number(a.date));

  //console.log(JSON.stringify(listBookmarks, null, 4));

  return (
    <List
      list={{ id: listWithBookmarks.id, title: listWithBookmarks.title }}
      bookmarks={bookmarksOnList}
      lists={allLists}
    />
  );
}
