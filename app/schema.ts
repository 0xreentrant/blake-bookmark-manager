import { relations } from "drizzle-orm";
import { integer, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: text("id").primaryKey().notNull(),
  googleId: text("google_id"),
  googleUsername: text("google_username"),
});

export const usersRelations = relations(users, ({ many }) => ({
  bookmarks: many(bookmarks),
}));

export type InsertUser = typeof users.$inferInsert;
export type SelectUser = typeof users.$inferSelect;

export const sessions = pgTable("sessions", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id),
  expiresAt: timestamp("expires_at", {
    withTimezone: true,
    mode: "date",
  }).notNull(),
});

export type InsertSession = typeof sessions.$inferInsert;
export type SelectSession = typeof sessions.$inferSelect;

export const bookmarks = pgTable("bookmarks", {
  id: serial("id").primaryKey().notNull(),
  title: text("title").notNull(),
  href: text("href").notNull(),
  date: text("date").notNull(),
  points: integer("points").default(0),
  notes: text("notes"),
  archived: integer("archived").default(0),
  userId: text("user_id")
  .notNull()
    .references(() => users.id, {
      onDelete: "cascade",
    }),
});

export const bookmarksRelations = relations(bookmarks, ({ one, many }) => ({
  bookmarksToLists: many(bookmarksToLists),
  user: one(users, {
    fields: [bookmarks.userId],
    references: [users.id],
  }),
}));

export type InsertBookmark = typeof bookmarks.$inferInsert;
export type SelectBookmark = typeof bookmarks.$inferSelect;

export const lists = pgTable("lists", {
  id: serial("id").primaryKey().notNull(),
  title: text("title").notNull(),
  userId: text("user_id").references(() => users.id, {
    onDelete: "cascade",
  }),
});

export const listsRelations = relations(lists, ({ many }) => ({
  bookmarksToLists: many(bookmarksToLists),
}));

export type InsertList = typeof lists.$inferInsert;
export type SelectList = typeof lists.$inferSelect;

export const bookmarksToLists = pgTable("bookmarks_to_lists", {
  bookmarkId: integer("bookmark_id")
    .notNull()
    .references(() => bookmarks.id, { onDelete: "cascade" }),
  listId: integer("list_id")
    .notNull()
    .references(() => lists.id, { onDelete: "cascade" }),
});

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

export type InsertBookmarksToLists = typeof bookmarksToLists.$inferInsert;
export type SelectBookmarksToLists = typeof bookmarksToLists.$inferSelect;
