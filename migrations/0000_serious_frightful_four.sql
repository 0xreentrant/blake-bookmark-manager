CREATE TABLE IF NOT EXISTS "bookmarks" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text,
	"href" text NOT NULL,
	"date" text,
	"points" integer DEFAULT 0,
	"notes" text,
	"archived" integer DEFAULT 0
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "bookmarks_to_lists" (
	"bookmark_id" integer NOT NULL,
	"list_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "lists" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "bookmarks_to_lists" ADD CONSTRAINT "bookmarks_to_lists_bookmark_id_bookmarks_id_fk" FOREIGN KEY ("bookmark_id") REFERENCES "public"."bookmarks"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "bookmarks_to_lists" ADD CONSTRAINT "bookmarks_to_lists_list_id_lists_id_fk" FOREIGN KEY ("list_id") REFERENCES "public"."lists"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
