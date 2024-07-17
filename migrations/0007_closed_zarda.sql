ALTER TABLE "users" ADD COLUMN "google_avatar" text;--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN IF EXISTS "google_username";