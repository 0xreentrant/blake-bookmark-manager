import { relations } from "drizzle-orm";
import {
  text,
  integer,
  sqliteTable,
  primaryKey,
} from "drizzle-orm/sqlite-core";

export const bookmarks = sqliteTable("bookmarks", {
  id: integer("id").primaryKey({ autoIncrement: true }).notNull(),
  title: text("title"),
  href: text("href").notNull(),
  date: text("date"),
  points: integer("points").default(0),
  notes: text("notes"),
  archived: integer("archived").default(0),
});

export const bookmarksRelations = relations(bookmarks, ({ many }) => ({
  bookmarksToLists: many(bookmarksToLists),
}));

export type InsertBookmark = typeof bookmarks.$inferInsert;
export type SelectBookmark = typeof bookmarks.$inferSelect;

export const lists = sqliteTable("lists", {
  id: integer("id").primaryKey({ autoIncrement: true }).notNull(),
  title: text("title"),
});

export const listsRelations = relations(lists, ({ many }) => ({
  bookmarksToLists: many(bookmarksToLists),
}));

export type InsertList = typeof lists.$inferInsert;
export type SelectList = typeof lists.$inferSelect;

export const bookmarksToLists = sqliteTable(
  "bookmarks_to_lists",
  {
    bookmarkId: integer("bookmark_id")
      .notNull()
      .references(() => bookmarks.id, { onDelete: "cascade" }),
    listId: integer("list_id")
      .notNull()
      .references(() => lists.id, { onDelete: "cascade" }),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.bookmarkId, t.listId] }),
  })
);

export const bookmarksToListsRelations = relations(
  bookmarksToLists,
  ({ one }) => ({
    bookmark: one(bookmarks, {
      fields: [bookmarksToLists.bookmarkId],
      references: [bookmarks.id],
    }),
    list: one(lists, {
      fields: [bookmarksToLists.listId],
      references: [lists.id],
    }),
  })
);
