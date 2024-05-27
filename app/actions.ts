"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { dbNew } from "./db";
import { bookmarks, lists, bookmarksToLists } from "./schema";
import { incr, decr } from "./dbUtils";

export async function archiveBookmark(id) {
  const out = await dbNew
    .update(bookmarks)
    .set({ archived: 1 })
    .where(eq(bookmarks.id, id));

  revalidatePath("/bookmarks");
  return out;
}

export async function restoreBookmark(id) {
  const out = await dbNew
    .update(bookmarks)
    .set({ archived: 0 })
    .where(eq(bookmarks.id, id));

  revalidatePath("/bookmarks", "layout");
  return out;
}

export async function upvoteBookmark(id) {
  const out = dbNew
    .update(bookmarks)
    .set({ points: incr(bookmarks.points) })
    .where(eq(bookmarks.id, id));

  revalidatePath("/bookmarks", "layout");
  return out;
}

export async function downvoteBookmark(id) {
  const out = await dbNew
    .update(bookmarks)
    .set({ points: decr(bookmarks.points) })
    .where(eq(bookmarks.id, id));

  revalidatePath("/", "page");
  return out;
}

export async function saveNote(id, notes, _) {
  const out = dbNew
    .update(bookmarks)
    .set({ notes: notes })
    .where(eq(bookmarks.id, id));

  return out;
}

export async function createList() {
  const out = dbNew.insert(lists).values({ title: "New List" }).returning();
  console.log({ out: out.values });
  //redirect(`/bookmarks/list/${out.get().id}`);
  revalidatePath("/");
  return out;
}

export async function addRemoveFromLists(bookmarkId, formData) {
  let listIdsSubmitted: Array<Number> = [];
  for (const [id] of formData) {
    listIdsSubmitted.push(Number(id));
  }

  const listsExistingOn: Array<Number> = dbNew
    .select({ listId: lists.id })
    .from(bookmarksToLists)
    .leftJoin(bookmarks, eq(bookmarksToLists.bookmarkId, bookmarks.id))
    .leftJoin(lists, eq(bookmarksToLists.listId, lists.id))
    .where(eq(bookmarks.id, bookmarkId))
    .all()
    .map(({ listId }) => listId);

  // TODO: optimize this so that if there are no changes do nothing, ie.:
  // - no change at all
  // - nothing to add
  // - nothing to remove

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
      dbNew
        .insert(bookmarksToLists)
        // @ts-ignore
        .values(listsToAddTo.map((listId: Number) => ({ listId, bookmarkId })))
        .returning()
        .get()
    );
  }

  if (listsToRemoveFrom.length > 0) {
    for (let listId of listsToRemoveFrom) {
      removed.push(
        dbNew
          .delete(bookmarksToLists)
          // @ts-ignore
          .where(eq(bookmarksToLists.listId, listId))
          .returning()
          .get()
      );
    }
  }

  console.log({ added, removed });

  revalidatePath("/bookmarks/list");
}

export async function deleteList(id) {
  await dbNew.delete(lists).where(eq(lists.id, id)).returning();
  console.log("deleting");
  revalidatePath("/");
  redirect("/bookmarks/all");
}

type List = {
  title: string;
};
export async function editList(id, formData: FormData) {
  const title = formData.get("title").toString();

  const out = await dbNew.update(lists).set({ title }).where(eq(lists.id, id));

  revalidatePath("/");
  return out;
}
