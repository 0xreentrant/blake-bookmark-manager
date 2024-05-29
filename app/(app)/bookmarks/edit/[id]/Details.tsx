"use client";

import { useState } from "react";
import { useAutosave } from "react-autosave";
import Editor from "@monaco-editor/react";
import { Entry } from "../../../components/Entry";
import {
  archiveBookmark,
  restoreBookmark,
  upvoteBookmark,
  downvoteBookmark,
  saveNote,
} from "../../../actions";

export function Details({ entry }) {
  const [text, setText] = useState(entry.notes);
  useAutosave({
    data: text,
    onSave: (data) => {
      saveNote(entry.id, data, null);
    },
  });

  const { id, archived, points, href, title, date } = entry;
  const isArchived = archived == 1;

  return (
    <>
      <Entry
          id={id}
          isArchived={isArchived}
          points={points}
          href={href}
          title={title}
          date={date}
        handleArchive={archiveBookmark}
        handleRestore={restoreBookmark}
        handleUpvote={upvoteBookmark}
        handleDownvote={downvoteBookmark}
      />
      <Editor
        height="50vh"
        defaultLanguage="markdown"
        defaultValue={entry.notes}
        theme="vs-dark"
        onChange={(data) => setText(data)}
      />
    </>
  );
}
