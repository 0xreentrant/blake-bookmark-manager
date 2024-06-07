"use server";
import { useEffect, useState, useContext, useRef } from "react";
import { count } from "drizzle-orm";
import { ListsPane } from "@/components/ListsPane";
import { BookmarksLayoutWrapper } from "./BookmarksLayoutWrapper";
import { dbNew } from "@/db";
import { bookmarks } from "@/schema";

export default async function BookmarksLayout({ children }) {
  const lists = await dbNew.query.lists
    .findMany({
      with: { bookmarksToLists: { with: { bookmark: true } } },
    })
    .then((data) => {
      return data.map(({ id, title, bookmarksToLists }) => {
        return { id, title, bookmarksCount: bookmarksToLists.length };
      });
    });

  const totalBookmarks = dbNew
    .select({ count: count() })
    .from(bookmarks)
    .get().count;

  return (
    <BookmarksLayoutWrapper
      navPanel={<ListsPane totalBookmarks={totalBookmarks} lists={lists} />}
      content={children}
    />
  );
}
