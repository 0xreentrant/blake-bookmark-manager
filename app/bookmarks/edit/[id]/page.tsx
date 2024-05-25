import { eq } from "drizzle-orm";
import { dbNew } from "../../../db";
import { Details } from "./Details";
import { bookmarks } from "../../../schema";

export default async function DetailsPage({ params }) {
  {
    /*
     *  const bookmark = await new Promise((resolve, reject) => {
     *    const bookmark = `
     *      select * from bookmarks
     *      where id = ?
     *    `;
     *
     *    db.get(bookmark, [params.id], (err, data) => {
     *      if (err) {
     *        console.error(err);
     *        return reject(err);
     *      }
     *
     *      resolve(data);
     *    });
     *  });
     */
  }

  const bookmark = dbNew.select().from(bookmarks).where(eq(bookmarks.id, params.id)).get();

  return <Details entry={bookmark} />;
}
