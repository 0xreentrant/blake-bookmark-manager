"use server";

import { eq, desc } from "drizzle-orm";
import { dbNew } from "../../db";
import { Bookmarks } from "../Bookmarks";
import { bookmarks } from "../../schema";

export default async function Page() {
 const list = await dbNew.query.bookmarks.findMany({
 where: eq(bookmarks.archived, 0),
 orderBy: [desc(bookmarks.points)]
 })

  return <Bookmarks bookmarks={list} hasError={false} />;
}
