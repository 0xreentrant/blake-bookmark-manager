import sqlite3 from "sqlite3";
import { Details } from "./Details";

const db = new sqlite3.Database("./bookmarks.db");

export default async function DetailsPage({ params }) {
  console.log({ getting: params.id });

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

      console.log("showing results:\n", data);

      resolve(data);
    });
  });

  return <Details entry={bookmark} />;
}
