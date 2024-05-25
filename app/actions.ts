"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { dbNew } from "./db";
import { bookmarks, lists } from "./schema";
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
  redirect(`/bookmarks/list/${out.get().id}`);
}
