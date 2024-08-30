"use server";

import { and, eq, desc } from "drizzle-orm";
import { db } from "@/lib/db";
import { Bookmarks } from "@/components/Bookmarks";
import { bookmarks } from "@/lib/schema";
import { Nothing } from "@/components/DefaultViews/Nothing";
import { PageHeading } from "@/components/Type/PageHeading";
import { getUserCookie } from "@/lib/auth";
import { allBookmarks, allLists } from "@/lib/queries";

// @invariant Non-"Archived" pages should not show archived bookmarks

export default async function Page() {
  const user = await getUserCookie();
  const userBookmarks = await allBookmarks(user);
  const userLists = await allLists(user);

  console.log("rendering page", Date.now());
  return (
    <>
      <PageHeading>All bookmarks</PageHeading>
      {userBookmarks?.length ? (
        <Bookmarks bookmarks={userBookmarks} allLists={userLists} />
      ) : (
        <Nothing />
      )}
    </>
  );
}
