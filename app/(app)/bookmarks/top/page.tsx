"use server";

import { eq, desc } from "drizzle-orm";
import { db } from "@/lib/db";
import { Bookmarks } from "@/components/Bookmarks";
import { Nothing } from "@/components/DefaultViews/Nothing";
import { PageHeading } from "@/components/Type/PageHeading";
import { getUserCookie } from "@/lib/auth";
import { topBookmarks, allLists } from "@/lib/queries";

export default async function Page() {
  const user = await getUserCookie();
  const userBookmarks = await topBookmarks(user);
  const userLists = await allLists(user);

  return (
    <>
      <PageHeading>Top bookmarks</PageHeading>
      {userBookmarks?.length ? (
        <Bookmarks bookmarks={userBookmarks} allLists={userLists} />
      ) : (
        <Nothing />
      )}
    </>
  );
}
