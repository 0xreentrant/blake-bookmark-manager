"use server";
import { count } from "drizzle-orm";
import { ListsPane } from "@/components/ListsPane";
import { BookmarksLayoutWrapper } from "./BookmarksLayoutWrapper";
import { db } from "@/db";
import { bookmarks } from "@/schema";

export default async function BookmarksLayout({ children }) {
  const lists = await db.query.lists
    .findMany({
      with: { bookmarksToLists: { with: { bookmark: true } } },
    })
    .then((data) => {
      return data.map(({ id, title, bookmarksToLists }) => {
        return { id, title, bookmarksCount: bookmarksToLists.length };
      });
    });

  const totalBookmarks = await db
    .select({ count: count() })
    .from(bookmarks)
    .then((data) => data[0].count);

  return (
    <BookmarksLayoutWrapper
      navPanel={
        <ListsPane
          totalBookmarks={totalBookmarks}
          lists={lists}
          // @dev this is handled in BookmarksLayoutWrapper w/ cloneElement, because we can't create
          // a handler with useState in a server component
          handleNavSelection={{}}
        />
      }
      content={children}
    />
  );
}
