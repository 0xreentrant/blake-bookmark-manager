import { db } from "../../db";
import { Details } from "./Details";

export default async function DetailsPage({ params }) {
  const bookmark = await new Promise((resolve, reject) => {
    const bookmark = `
      select * from bookmarks
      where id = ?
    `;

    db.get(bookmark, [params.id], (err, data) => {
      if (err) {
        console.error(err);
        return reject(err);
      }

      resolve(data);
    });
  });

  return <Details entry={bookmark} />;
}
