"use server";

import { eq, desc } from "drizzle-orm";
import { createSelectSchema } from "drizzle-zod";
import { db } from "@/lib/db";
import { bookmarks, lists } from "@/lib/schema";
import { List } from "./List";

// @invariant Lists should not show archived bookmarks

export default async function Page({ params }) {
  const { id } = params;

  const allLists = await db.query.lists.findMany();

  const listWithBookmarks = await db.query.lists.findFirst({
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

  let currentList = listWithBookmarks
    ? { id: listWithBookmarks.id, title: listWithBookmarks.title }
    : { id: Number.MAX_SAFE_INTEGER, title: "" };

  return (
    <List
      list={currentList}
      bookmarks={bookmarksOnList ?? []}
      lists={allLists ?? []}
    />
  );
}
