"use client";

import { useState } from "react";
import { useAutosave } from "react-autosave";
import Editor from "@monaco-editor/react";
import { Entry } from "../../components/Entry";
import {
  archiveBookmark,
  restoreBookmark,
  upvoteBookmark,
  downvoteBookmark,
  saveNote,
} from "../../actions";

export function Details({ entry }) {
  const [text, setText] = useState(entry.notes);
  useAutosave({
    data: text,
    onSave: (data) => {
      console.log({ saving: data });
      saveNote(entry.id, data);
    },
  });

  return (
    <>
      <Entry
        entry={entry}
        doArchive={archiveBookmark}
        doRestore={restoreBookmark}
        doUpvote={upvoteBookmark}
        doDownvote={downvoteBookmark}
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
