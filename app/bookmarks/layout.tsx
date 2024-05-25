"use server";
import { count } from "drizzle-orm";
import { ListsPane } from "../components/ListsPane";
import { BookmarksLayoutWrapper } from "./BookmarksLayoutWrapper";
import { dbNew } from "../db";
import { bookmarks } from "../schema";

export default async function BookmarksLayout({ children }) {
  const lists = await dbNew.query.lists.findMany({});
  const totalBookmarks = dbNew
    .select({ count: count() })
    .from(bookmarks)
    .get().count;

  return (
    <BookmarksLayoutWrapper
      left={<ListsPane totalBookmarks={totalBookmarks} lists={lists} />}
      right={children}
    />
  );
}
