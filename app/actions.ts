"use server";

import fs from "node:fs/promises";
import { eq, and } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { db } from "./db";
import { bookmarks, lists, bookmarksToLists } from "./schema";
import { incr, decr } from "./dbUtils";
import { timestampSeconds } from "./utils/ui";

export async function archiveBookmark(id) {
  const out = await db
    .update(bookmarks)
    .set({ archived: 1 })
    .where(eq(bookmarks.id, id));

  console.log("archiving", id);

  revalidatePath("/");
  return out;
}

export async function restoreBookmark(id) {
  const out = await db
    .update(bookmarks)
    .set({ archived: 0 })
    .where(eq(bookmarks.id, id));

  console.log("restoring", id);

  revalidatePath("/bookmarks", "layout");
  return out;
}

export async function upvoteBookmark(id) {
  const out = db
    .update(bookmarks)
    .set({ points: incr(bookmarks.points) })
    .where(eq(bookmarks.id, id));

  revalidatePath("/bookmarks", "layout");
  return out;
}

// TODO: only set if value >= 0
export async function downvoteBookmark(id) {
  const out = await db
    .update(bookmarks)
    .set({ points: decr(bookmarks.points) })
    .where(eq(bookmarks.id, id));

  revalidatePath("/", "page");
  return out;
}

export async function saveNote(id, notes, _) {
  const out = await db
    .update(bookmarks)
    .set({ notes: notes })
    .where(eq(bookmarks.id, id))
    .returning();

  console.log(id, notes, out);

  revalidatePath("/bookmarks/edit");
  return out;
}

export async function createList() {
  const out = await db.insert(lists).values({ title: "New List" }).returning();

  console.log(out);
  revalidatePath("/");
  return out[0];
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

  console.log({ added, removed });

  // NOTE: this is for the Random page, so it doesn't refresh after adding/removing bookmarks from lists
  console.log({ preventRefresh });
  if (!preventRefresh) {
    revalidatePath("/bookmarks");
  }
}

export async function deleteList(id) {
  await db.delete(lists).where(eq(lists.id, id)).returning();
  console.log("deleting");
  revalidatePath("/");
  redirect("/bookmarks/all");
}

export async function editList(id, formData: FormData) {
  const title = formData.get("title").toString();

  const out = await db.update(lists).set({ title }).where(eq(lists.id, id));

  revalidatePath("/");
  return out;
}

export async function editBookmark(id, formData: FormData) {
  const title = formData.get("title").toString();

  console.log(title);

  const out = await db
    .update(bookmarks)
    .set({ title })
    .where(eq(bookmarks.id, id));

  revalidatePath("/");
  return out;
}

export async function saveBookmark(formData: FormData) {
  const href = formData.get("href").toString();
  const title = formData.get("title").toString();

  await db.insert(bookmarks).values({
    title,
    href,
    date: timestampSeconds().toString(),
  });

  revalidatePath("/");
}
