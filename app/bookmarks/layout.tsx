"use server";
import { ListsPane } from "../components/ListsPane";
import { BookmarksLayoutWrapper } from "./BookmarksLayoutWrapper";
import { dbNew } from "../db";

export default async function BookmarksLayout({ children }) {
  const lists = await dbNew.query.lists.findMany({});

  return (
    <BookmarksLayoutWrapper
      left={<ListsPane lists={lists} />}
      right={children}
    />
  );
}
