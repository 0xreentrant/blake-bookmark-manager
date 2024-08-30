"use server";
import { cloneElement } from "react";
import { unstable_noStore as noStore } from "next/cache";
import { count, eq } from "drizzle-orm";
import { ListsPane } from "@/components/ListsPane";
import { BookmarksLayoutWrapper } from "./BookmarksLayoutWrapper";
import { db } from "@/lib/db";
import { bookmarks, lists, users } from "@/lib/schema";
import { redirect } from "next/navigation";
import { validateRequest, BlakeUser } from "@/lib/auth";

export default async function BookmarksLayout({ children }) {
  // @dev it's imperative that all pages with dynamic data derive from a layout with `noStore()`
  noStore();

  const { user: userCookieId } = await validateRequest();
  if (!userCookieId) {
    return redirect("/login");
  }

  const user: BlakeUser = await db.query.users
    .findFirst({
      where: eq(users.id, userCookieId.id),
    })
    .then((user) => {
      if (!user) {
        throw new Error("User not found");
      }
      return {
        userId: userCookieId.id,
        username: user.googleId,
        givenName: user.givenName,
        familyName: user.familyName,
        avatar: user.googleAvatar,
      };
    });

  const userLists = await db.query.lists
    .findMany({
      with: { bookmarksToLists: { with: { bookmark: true } } },
      where: eq(lists.userId, userCookieId.id),
    })
    .then((data) => {
      return data.map(({ id, title, bookmarksToLists }) => {
        return { id, title, bookmarksCount: bookmarksToLists.length };
      });
    });

  const totalBookmarks = await db
    .select({ count: count() })
    .from(bookmarks)
    .where(eq(bookmarks.userId, userCookieId.id))
    .then((data) => data[0].count);

  const pagesWithUser = cloneElement(children, {
    user: userCookieId,
  });

  console.log("rendering layout", Date.now());

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
