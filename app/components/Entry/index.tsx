"use client";
import * as Dialog from "@radix-ui/react-dialog";
import Link from "next/link";
import { IconEdit } from "../Icon/Edit";
import { IconChevronDown } from "../Icon/ChevronDown";
import { IconChevronUp } from "../Icon/ChevronUp";
import { IconTrash } from "../Icon/Trash";
import { IconRefresh } from "../Icon/Refresh";
import { IconFolderAdd } from "../Icon/FolderAdd";
import { IconFolderCheck } from "../Icon/FolderCheck";
import { addRemoveFromLists } from "../../actions";
import { ListEntry } from "./ListEntry";
import { HNLink } from "./HNLink";
import { CachedLink } from "./CachedLink";

export const Entry = ({
  id,
  isArchived,
  points,
  href,
  title,
  date,
  allLists,
  listsIncluded,
  handleArchive,
  handleRestore,
  handleUpvote,
  handleDownvote,
  style,
}: {
  id;
  isArchived;
  points;
  href;
  title;
  date;
  allLists;
  listsIncluded;
  handleArchive;
  handleRestore;
  handleUpvote;
  handleDownvote;
  style?;
}) => {
  // TODO: remove the border and fix the spacing between entries
  return (
    <div className="flex border rounded-lg" style={style}>
      <div className="flex flex-col items-center">
        {points}
        <div className="flex flex-col">
          <IconChevronUp onClick={handleUpvote} />
          <IconChevronDown onClick={handleDownvote} />
        </div>
      </div>
      <div>
        <h3>
          <Link href={href}>{title}</Link>
        </h3>
        {new Date(date * 1000).toLocaleString()}
        <hr />
        <div className="flex w-full items-center">
          <CachedLink link={href} />
          <HNLink link={href} />
          {isArchived ? (
            <IconRefresh onClick={handleRestore} />
          ) : (
            <IconTrash onClick={handleArchive} />
          )}
          <Link href={`/bookmarks/edit/${id}`}>
            <IconEdit />
          </Link>

          {/* TODO: optimize, pull up so that we're only using 1 actual modal for add/remove lists */}
          <Dialog.Root>
            <Dialog.Trigger>
              {listsIncluded ? (
                <IconFolderAdd />
              ) : (
                <IconFolderCheck fill="green" />
              )}
            </Dialog.Trigger>
            <Dialog.Portal>
              <Dialog.Overlay className="bg-blackA6 data-[state=open]:animate-overlayShow fixed inset-0" />
              <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
                <Dialog.Title className="m-0  font-medium">
                  Add to List
                </Dialog.Title>
                <form action={addRemoveFromLists.bind(null, id)}>
                  {allLists &&
                    allLists.map((list) => (
                      <ListEntry
                        key={list.id}
                        list={list}
                        isChecked={
                          listsIncluded && listsIncluded.includes(list.id)
                        }
                      />
                    ))}
                  <div className="mt-[25px] flex justify-end">
                  <Dialog.Close>
                    <button className="inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none focus:shadow-[0_0_0_2px] focus:outline-none">
                      Cancel
                    </button>
                  </Dialog.Close>
                    <button
                      type="submit"
                      className="inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none focus:shadow-[0_0_0_2px] focus:outline-none"
                    >
                      Done
                    </button>
                  </div>
                </form>
                <Dialog.Close />
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        </div>
      </div>
    </div>
  );
};
