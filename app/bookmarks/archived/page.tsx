"use server";

import { eq, desc } from "drizzle-orm";
import { dbNew } from "../../db";
import { Bookmarks } from "../Bookmarks";
import { bookmarks } from "../../schema";

export default async function Page() {
  const list = await dbNew.query.bookmarks.findMany({
    where: eq(bookmarks.archived, 1),
    orderBy: [desc(bookmarks.date)],
  });

  return <Bookmarks bookmarks={list} hasError={false} />;
}
