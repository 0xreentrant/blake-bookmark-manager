"use server";
import fs from "node:fs/promises";
import { eq, and } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { db } from "@/db";
import { bookmarks, lists, bookmarksToLists } from "@/schema";
import { incr, decr } from "@/dbUtils";
const cheerio = require("cheerio");

export async function uploadBookmarksFile(formData: FormData) {
  console.log(formData);

  const file = formData.get("file") as File;
  const text = await file.text();

  const $ = cheerio.load(text);
  let list = [];
  $("a").each((_, el) => {
    const $el = $(el);
    list.push({
      href: $el.attr("href"),
      date: parseInt($el.attr("add_date")),
      title: $el.text(),
    });
  });

  const out = await db.insert(bookmarks).values(list).returning();

  console.log(out)
  revalidatePath("/");
}
