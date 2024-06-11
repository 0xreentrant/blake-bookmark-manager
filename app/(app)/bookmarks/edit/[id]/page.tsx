import { eq } from "drizzle-orm";
import { db } from "@/db";
import { Details } from "./Details";
import { bookmarks } from "@/schema";

export default async function DetailsPage({ params }) {
  const bookmark = db
    .select()
    .from(bookmarks)
    .where(eq(bookmarks.id, params.id))
    .get();

  return <Details entry={bookmark} />;
}
