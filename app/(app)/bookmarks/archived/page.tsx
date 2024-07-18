"use server";

import { Bookmarks } from "@/components/Bookmarks";
import { Nothing } from "@/components/DefaultViews/Nothing";
import { PageHeading } from "@/components/Type/PageHeading";
import { useUserCookie } from "@/lib/auth";
import { archivedBookmarks, allLists } from "@/lib/queries";

// @invariant Only archived page should show archived bookmarks

export default async function Page() {
  const user = await useUserCookie();
  const userBookmarks = await archivedBookmarks(user);
  const userLists = await allLists(user)

  return (
    <>
      <PageHeading>Archived bookmarks</PageHeading>
      {userBookmarks?.length ? (
        <Bookmarks bookmarks={userBookmarks} allLists={userLists} />
      ) : (
        <Nothing />
      )}
    </>
  );
}
