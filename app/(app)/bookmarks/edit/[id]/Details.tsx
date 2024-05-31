"use client";

import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IconEdit } from "@/components/Icon/Edit";
import { IconChevronDown } from "@/components/Icon/ChevronDown";
import { IconChevronUp } from "@/components/Icon/ChevronUp";
import { IconTrash } from "@/components/Icon/Trash";
import { IconRefresh } from "@/components/Icon/Refresh";
import { IconFolderAdd } from "@/components/Icon/FolderAdd";
import { IconFolderCheck } from "@/components/Icon/FolderCheck";
import { addRemoveFromLists } from "@/actions";
import { ListEntry } from "./ListEntry";
import { HNLink } from "./HNLink";
import { CachedLink } from "./CachedLink";

import { useAutosave } from "react-autosave";
import Editor from "@monaco-editor/react";
import { Entry } from "@/components/Entry";
import {
  archiveBookmark,
  restoreBookmark,
  upvoteBookmark,
  downvoteBookmark,
  saveNote,
} from "@/actions";

export function Details({ entry }) {
  const [isDialogOpen, setDialogOpen] = useState(false);
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
      {/*
       *<Entry
       *  id={id}
       *  isArchived={isArchived}
       *  points={points}
       *  href={href}
       *  title={title}
       *  date={date}
       *  handleArchive={archiveBookmark}
       *  handleRestore={restoreBookmark}
       *  handleUpvote={upvoteBookmark}
       *  handleDownvote={downvoteBookmark}
       * />
       */}

      <div className="flex p-2" style={{}}>
        <div className="flex flex-col items-center">
          {points}
          <div className="flex flex-col">
            <IconChevronUp onClick={upvoteBookmark} />
            <IconChevronDown onClick={downvoteBookmark} />
          </div>
        </div>
        <div className="flex flex-col grow max-w-[calc(100%-1.25rem)] pl-2">
          <span className="font-bold">
            <Link href={href}>{title}</Link>
          </span>
          <div>{new Date(date * 1000).toLocaleString()}</div>
        </div>
      </div>

      <hr />

      <div className="p-4">
        <span className="font-medium">Notes</span>
        <div className="border-2 border-slate">
          <Editor
            height="50vh"
            defaultLanguage="markdown"
            defaultValue={entry.notes}
            onChange={(data) => setText(data)}
          />
        </div>
      </div>
    </>
  );
}
