"use server";
import { cloneElement } from "react";
import { unstable_noStore as noStore } from "next/cache";
import { count, eq } from "drizzle-orm";
import { ListsPane } from "@/components/ListsPane";
import { BookmarksLayoutWrapper } from "./BookmarksLayoutWrapper";
import { db } from "@/db";
import { bookmarks, lists } from "@/schema";
import { redirect } from "next/navigation";
import { validateRequest } from "@/lib/auth";

export default async function BookmarksLayout({ children }) {
  // @dev it's imperative that all pages with dynamic data derive from a layout with `noStore()`
  noStore();

  const { user } = await validateRequest();
  if (!user) {
    return redirect("/login");
  }

  const userLists = await db.query.lists
    .findMany({
      with: { bookmarksToLists: { with: { bookmark: true } } },
      where: eq(lists.userId, user.id),
    })
    .then((data) => {
      return data.map(({ id, title, bookmarksToLists }) => {
        return { id, title, bookmarksCount: bookmarksToLists.length };
      });
    });

  const totalBookmarks = await db
    .select({ count: count() })
    .from(bookmarks)
    .where(eq(bookmarks.userId, user.id))
    .then((data) => data[0].count);

  const pagesWithUser = cloneElement(children, {
    user,
  });

  return (
    <BookmarksLayoutWrapper
      navPanel={
        <ListsPane
          totalBookmarks={totalBookmarks}
          lists={userLists}
          // @dev this is handled in BookmarksLayoutWrapper w/ cloneElement, because we can't create
          // a handler with useState in a server component
          handleNavSelection={{}}
        />
      }
      content={pagesWithUser}
      user={user}
    />
  );
}
