import { and, eq, desc } from "drizzle-orm";
import { db } from "@/lib/db";
import { bookmarks, lists } from "@/lib/schema";
import type { Session, User } from "lucia";

export const allBookmarks = async ({ id }: User) =>
  await db.query.bookmarks.findMany({
    with: { bookmarksToLists: { with: { list: true } } },
    where: and(eq(bookmarks.archived, 0), eq(bookmarks.userId, id)),
    orderBy: [desc(bookmarks.date)],
  });

export const topBookmarks = async ({ id }: User) =>
  await db.query.bookmarks.findMany({
    with: { bookmarksToLists: { with: { list: true } } },
    where: and(eq(bookmarks.archived, 0), eq(bookmarks.userId, id)),
    orderBy: [desc(bookmarks.points)],
  });

export const archivedBookmarks = async ({ id }: User) =>
  await db.query.bookmarks.findMany({
    with: { bookmarksToLists: { with: { list: true } } },
    where: and(eq(bookmarks.archived, 1), eq(bookmarks.userId, id)),
    orderBy: [desc(bookmarks.date)],
  });

export const allLists = async ({ id }: User) =>
  await db.query.lists.findMany({
    where: eq(lists.userId, id),
  });
