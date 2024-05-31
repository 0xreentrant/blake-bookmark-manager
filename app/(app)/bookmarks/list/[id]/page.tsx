"use server";

import { eq, desc } from "drizzle-orm";
import { createSelectSchema } from "drizzle-zod";
import { z } from "zod";
import { dbNew } from "@/db";
import { lists } from "@/schema";
import { List } from "./List";

// @invariant Lists should not show archived bookmarks

export default async function Page({ params }) {
  const { id } = params;

  const listSchema = createSelectSchema(lists);
  type list = z.infer<typeof listSchema>;

  const allLists: Array<list> = await dbNew.query.lists.findMany();

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

  const bookmarksOnList = listWithBookmarks.bookmarksToLists.map((b) => ({
    ...b.bookmark,
  }));

  //console.log(JSON.stringify(listBookmarks, null, 4));

  return (
    <List
      list={{ id: listWithBookmarks.id, title: listWithBookmarks.title }}
      bookmarks={bookmarksOnList}
      lists={allLists}
    />
  );
}
