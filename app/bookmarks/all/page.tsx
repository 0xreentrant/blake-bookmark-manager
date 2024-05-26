"use server";

import { eq, desc } from "drizzle-orm";
import { dbNew } from "../../db";
import { Bookmarks } from "../../components/Bookmarks";
import { bookmarks, lists } from "../../schema";

export default async function Page() {
  const allBookmarks = await dbNew.query.bookmarks.findMany({
    where: eq(bookmarks.archived, 0),
    orderBy: [desc(bookmarks.date)],
  });

  const allLists = await dbNew.query.lists.findMany();

  return (
    <Bookmarks bookmarks={allBookmarks} lists={allLists} hasError={false} />
  );
}
