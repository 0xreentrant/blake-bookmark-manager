import { sql } from "drizzle-orm";
import { text, integer, sqliteTable } from "drizzle-orm/sqlite-core";

export const bookmarks = sqliteTable("bookmarks", {
  id: integer("id").primaryKey({ autoIncrement: true }).notNull(),
  title: text("title"),
  href: text("href").notNull(),
  date: text("date"),
  points: integer("points"),
  notes: text("notes"),
  archived: integer("archived"),
});

export type InsertBookmark = typeof bookmarks.$inferInsert;
export type SelectBookmark = typeof bookmarks.$inferSelect;

export const lists = sqliteTable("lists", {
  id: integer("id"),
  title: text("title"),
});

export type InsertList = typeof lists.$inferInsert;
export type SelectList = typeof lists.$inferSelect;
