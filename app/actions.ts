"use server";

import sqlite3 from "sqlite3";
import { revalidatePath } from "next/cache";

const db = new sqlite3.Database("./bookmarks.db");

export async function archiveBookmark(id) {
  await new Promise((resolve, reject) => {
    const query = `
      update bookmarks
      set archived = 1
      where id = ?
    `;

    db.all(query, [id], (err, data) => {
      if (err) {
        console.error(err);
        return reject(err);
      }

      resolve({ message: "Archived id " + id });
    });
  });

  revalidatePath("/bookmarks", "layout");
}

export async function restoreBookmark(id) {
  return await new Promise((resolve, reject) => {
    const query = `
      update bookmarks
      set archived = 0
      where id = ?
    `;

    db.all(query, [id], (err, data) => {
      if (err) {
        console.error(err);
        return reject(err);
      }

      resolve({ message: "Restored id " + id });
    });

    revalidatePath("/bookmarks", "layout");
  });
}

export async function upvoteBookmark(id) {
  return await new Promise((resolve, reject) => {
    const query = `
      update bookmarks
      set points = points + 1
      where id = ?
    `;

    db.all(query, [id], (err, data) => {
      if (err) {
        console.error(err);
        return reject(err);
      }

      resolve({ message: "Upvoted id " + id });
    });

    revalidatePath("/bookmarks", "layout");
  });
}

export async function downvoteBookmark(id) {
  return await new Promise((resolve, reject) => {
    const query = `
      update bookmarks
      set points = points - 1
      where id = ?
    `;

    db.all(query, [id], (err, data) => {
      if (err) {
        console.error(err);
        return reject(err);
      }

      resolve({ message: "Downvoted id " + id });
    });

    revalidatePath("/", "page");
  });
}

export async function saveNote(id, notes, postData) {
  return await new Promise((resolve, reject) => {
    const query = `
      update bookmarks
      set notes = ?
      where id = ?
    `;

    db.all(query, [notes, id], (err, data) => {
      if (err) {
        console.error(err);
        return reject(err);
      }

      resolve({ message: "Saved note to id " + id });
    });

    // don't revalidate the path so that the user can continue to
    // edit without disruption via autosave
  });
}
