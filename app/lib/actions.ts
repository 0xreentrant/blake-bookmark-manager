"use server";

import fs from "node:fs/promises";
import { eq, and } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { bookmarks, lists, bookmarksToLists } from "@/lib/schema";
import type { InsertList } from "@/lib/schema";
import { incr, decr } from "@/lib/dbUtils";
import { timestampSeconds } from "@/lib/ui";

export async function archiveBookmark(id) {
  await db.update(bookmarks).set({ archived: 1 }).where(eq(bookmarks.id, id));

  revalidatePath("/");
}

export async function restoreBookmark(id) {
  await db.update(bookmarks).set({ archived: 0 }).where(eq(bookmarks.id, id));

  revalidatePath("/");
}

export async function upvoteBookmark(id) {
  await db
    .update(bookmarks)
    .set({ points: incr(bookmarks.points) })
    .where(eq(bookmarks.id, id));

  revalidatePath("/");
}

// TODO: only set if value >= 0
export async function downvoteBookmark(id) {
  await db
    .update(bookmarks)
    .set({ points: decr(bookmarks.points) })
    .where(eq(bookmarks.id, id));

  revalidatePath("/", "page");
}

export async function saveNote(id, notes, _) {
  await db.update(bookmarks).set({ notes: notes }).where(eq(bookmarks.id, id));

  revalidatePath("/");
}

export async function createList(title: string, userId: string) {
  console.log({title, userId})
  const out: InsertList[] = await db
    .insert(lists)
    .values({ title, userId })
    .returning();

  revalidatePath("/");
  // send back list data for the redirect
  return out[0].id;
}

export async function removeFromAllLists(id) {
  await db
    .delete(bookmarksToLists)
    // @ts-ignore figure this error out
    .where(eq(bookmarksToLists.bookmarkId, id));

  revalidatePath("/");
}

// @dev this should be called from an actual form with list ids
export async function addRemoveFromLists(preventRefresh, bookmarkId, formData) {
  // TODO: optimize this so that if there are no changes do nothing, ie.:
  // - no change at all
  // - nothing to add
  // - nothing to remove

  let listIdsSubmitted: Array<Number> = [];
  for (const [id] of formData) {
    listIdsSubmitted.push(Number(id));
  }

  const listsExistingOn: Array<Number> = await db
    .select({ listId: lists.id })
    .from(bookmarksToLists)
    .leftJoin(bookmarks, eq(bookmarksToLists.bookmarkId, bookmarks.id))
    .leftJoin(lists, eq(bookmarksToLists.listId, lists.id))
    .where(eq(bookmarks.id, bookmarkId))
    .then((data) => {
      return data.map(({ listId }) => listId);
    });

  const setIntersect = (a, b) => a.filter((e) => b.includes(e));
  const setSubtract = (m, s) => m.filter((e) => !s.includes(e));

  const listsToRemoveFrom: Array<Number> = setSubtract(
    listsExistingOn,
    listIdsSubmitted
  );
  const listsToAddTo: Array<Number> = setSubtract(
    listIdsSubmitted,
    setIntersect(listIdsSubmitted, listsExistingOn)
  );

  console.log({
    listIdsSubmitted,
    listsExistingOn,
    listsToRemoveFrom,
    listsToAddTo,
  });

  const added = [];
  const removed = [];

  if (listsToAddTo.length > 0) {
    added.push(
      await db
        .insert(bookmarksToLists)
        // @ts-ignore figure this error out
        .values(listsToAddTo.map((listId: Number) => ({ listId, bookmarkId })))
        .returning()
    );
  }

  if (listsToRemoveFrom.length > 0) {
    for (let listId of listsToRemoveFrom) {
      removed.push(
        // TODO: extract common operation
        await db
          .delete(bookmarksToLists)
          // @ts-ignore figure this error out
          .where(
            and(
              // @ts-ignore figure this error out
              eq(bookmarksToLists.listId, listId),
              // @ts-ignore figure this error out
              eq(bookmarksToLists.bookmarkId, bookmarkId)
            )
          )
          .returning()
      );
    }
  }

  // NOTE: this is for the Random page, so it doesn't refresh after adding/removing bookmarks from lists
  if (!preventRefresh) {
    revalidatePath("/");
  }
}

export async function deleteList(id) {
  await db.delete(lists).where(eq(lists.id, id)).returning();
  revalidatePath("/");
  redirect("/");
}

export async function editList(id, formData: FormData) {
  const title = formData.get("title").toString();

  await db.update(lists).set({ title }).where(eq(lists.id, id));

  revalidatePath("/");
}

export async function editBookmark(id, formData: FormData) {
  const title = formData.get("title").toString();

  console.log(title);

  await db.update(bookmarks).set({ title }).where(eq(bookmarks.id, id));

  revalidatePath("/");
}

export async function saveBookmark(userId: string, formData: FormData) {
  const href = formData.get("href").toString();
  const title = formData.get("title").toString();

  await db.insert(bookmarks).values({
    userId,
    title,
    href,
    date: timestampSeconds().toString(),
  });

  revalidatePath("/");
}
