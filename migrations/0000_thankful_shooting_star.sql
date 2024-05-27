CREATE TABLE `bookmarks` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text,
	`href` text NOT NULL,
	`date` text,
	`points` integer DEFAULT 0,
	`notes` text,
	`archived` integer DEFAULT 0
);
--> statement-breakpoint
CREATE TABLE `bookmarks_to_lists` (
	`bookmark_id` integer NOT NULL,
	`list_id` integer NOT NULL,
	FOREIGN KEY (`bookmark_id`) REFERENCES `bookmarks`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`list_id`) REFERENCES `lists`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `lists` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text
);
