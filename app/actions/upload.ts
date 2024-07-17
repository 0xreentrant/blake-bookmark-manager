"use server";
import fs from "node:fs/promises";
import { eq, and } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import {
  bookmarks,
  type InsertBookmark,
  lists,
  bookmarksToLists,
} from "@/lib/schema";
import { incr, decr } from "@/lib/dbUtils";
import cheerio from "cheerio";

export async function uploadBookmarksFile(userId: string, formData: FormData) {
  console.log(formData);

  const file = formData.get("file") as File;
  const text = await file.text();
  const $ = cheerio.load(text);

  let list: InsertBookmark[] = [];
  $("a").each((_, el) => {
    const $el = $(el);
    list.push({
      userId,
      href: $el.attr("href"),
      date: $el.attr("add_date"),
      title: $el.text(),
    });
  });

  const insertedBookmarks = await db.insert(bookmarks).values(list).returning();

  console.log(insertedBookmarks);
  revalidatePath("/");
}
