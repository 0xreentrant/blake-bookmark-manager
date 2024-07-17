import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { Details } from "./Details";
import { bookmarks } from "@/lib/schema";

export default async function DetailsPage({ params }) {
  const bookmark = await db
    .select()
    .from(bookmarks)
    .where(eq(bookmarks.id, params.id))
    .then((data) => data[0]);

  // TODO: create an error widget and show appropriately
  return bookmark ? (
    <Details entry={bookmark} />
  ) : (
    "There was an error loading your bookmark"
  );
}
