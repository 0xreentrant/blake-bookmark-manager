"use server";

import { eq, desc } from "drizzle-orm";
import { dbNew } from "../../db";
import { Bookmarks } from "../../components/Bookmarks";
import { bookmarks } from "../../schema";

export default async function Page() {
  const list = await dbNew.query.bookmarks.findMany({
    where: eq(bookmarks.archived, 1),
    orderBy: [desc(bookmarks.date)],
  });

  const allLists = await dbNew.query.lists.findMany();

  if (!list.length) {
    return <h1>Nothing Here!</h1>;
  }

  return <Bookmarks bookmarks={list} allLists={allLists} hasError={false} />;
}
