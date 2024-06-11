"use server";

import { eq, desc } from "drizzle-orm";
import { db } from "@/db";
import { Bookmarks } from "@/components/Bookmarks";
import { bookmarks } from "@/schema";
import { Nothing } from "@/components/DefaultViews/Nothing";
import { PageHeading } from "@/components/Type/PageHeading";

export default async function Page() {
  const list = await db.query.bookmarks.findMany({
    where: eq(bookmarks.archived, 0),
    orderBy: [desc(bookmarks.points)],
  });

  const allLists = await db.query.lists.findMany();
  return (
    <>
      <PageHeading>Top bookmarks</PageHeading>
      {list?.length ? (
        <Bookmarks bookmarks={list} allLists={allLists} />
      ) : (
        <Nothing />
      )}
    </>
  );
}
