"use client";
import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IconEdit } from "../Icon/Edit";
import { IconChevronDown } from "../Icon/ChevronDown";
import { IconChevronUp } from "../Icon/ChevronUp";
import { IconTrash } from "../Icon/Trash";
import { IconRefresh } from "../Icon/Refresh";
import { IconFolderAdd } from "../Icon/FolderAdd";
import { IconFolderCheck } from "../Icon/FolderCheck";
import { addRemoveFromLists, removeFromAllLists } from "../../actions";
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
  includedInLists,
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
  includedInLists;
  handleArchive;
  handleRestore;
  handleUpvote;
  handleDownvote;
  style?;
}) => {
  const [isModifyListsDialogOpen, setModifyListsDialogOpen] = useState(false);
  const [isArchiveAlertOpen, setArchiveAlertOpen] = useState(false);
  const shouldPreventRefresh = usePathname().includes("random");

  const includedListNames = allLists.filter(
    (list) => includedInLists && includedInLists.includes(list.id)
  );

  const handleArchiveAlert = () => {
    setArchiveAlertOpen(true);
  };

  const handleArchiveByExistenceInLists = includedInLists?.length
    ? handleArchiveAlert // handleArchive will be called by the alert form action
    : handleArchive;

  //console.log({
  //title,
  //includedInLists,
  //alertIfTrue: !!includedInLists?.length,
  //});

  // TODO: remove the border and fix the spacing between entries
  return (
    <div className="flex border rounded-lg p-2" style={style}>
      <div className="flex flex-col items-center">
        {points}
        <div className="flex flex-col">
          <IconChevronUp onClick={handleUpvote} />
          <IconChevronDown onClick={handleDownvote} />
        </div>
      </div>
      <div className="flex flex-col grow max-w-[calc(100%-1.25rem)] pl-2">
        <span className="truncate font-bold" title={title}>
          <Link href={href}>{title}</Link>
        </span>
        <div className="block lg:inline lg:pl-2">
          {new Date(date * 1000).toLocaleString()}
        </div>
        <hr className="mt-1.5" />
        <div className="flex w-full items-center pt-1.5 gap-1.5 items-center">
          <span title="Cached version from the Internet Archive">
            <CachedLink link={href} />
          </span>
          <span title="Algolia search for a related post at Hacker News">
            <HNLink link={href} />
          </span>
          {isArchived ? (
            <span title="Restore from archive">
              <IconRefresh onClick={handleRestore} />
            </span>
          ) : (
            <span title="Remove from bookmarks and associated lists">
              <IconTrash onClick={handleArchiveByExistenceInLists} />
            </span>
          )}
          <Link href={`/bookmarks/edit/${id}`} title="Edit bookmark details">
            <IconEdit />
          </Link>
          <span onClick={() => setModifyListsDialogOpen(true)}>
            {includedInLists && !includedInLists.length ? (
              <span title="Add or remove from a list">
                <IconFolderAdd />
              </span>
            ) : (
              <span title="Add or remove from a list">
                <IconFolderCheck fill="green" />
              </span>
            )}
          </span>

          {/* TODO: optimize, pull up so that we're only using 1 actual modal for add/remove lists */}
          <AlertDialog.Root
            open={isArchiveAlertOpen}
            onOpenChange={setArchiveAlertOpen}
          >
            <AlertDialog.Trigger />
            <AlertDialog.Portal>
              <AlertDialog.Overlay className="bg-blackA6 data-[state=open]:animate-overlayShow fixed inset-0" />
              <AlertDialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[500px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
                <AlertDialog.Title className="text-mauve12 m-0 text-[17px] font-medium">
                  Are you sure?
                </AlertDialog.Title>
                <AlertDialog.Description className="text-mauve11 mt-4 mb-5 text-[15px] leading-normal">
                  This bookmark is part of one or more lists. If you archive
                  this bookmark, it will be removed from all lists it is a part
                  of.
                </AlertDialog.Description>
                <div>
                  Lists:
                  <div>
                    {includedInLists.map((b) => (
                      <div key={b.listId}>{b.list.title}</div>
                    ))}
                  </div>
                </div>
                <div className="flex justify-end gap-[25px]">
                  <AlertDialog.Cancel asChild>
                    <button className="text-mauve11 bg-mauve4 hover:bg-mauve5 focus:shadow-mauve7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none outline-none focus:shadow-[0_0_0_2px]">
                      Cancel
                    </button>
                  </AlertDialog.Cancel>
                  <button
                    onClick={async () => {
                      await handleArchive();
                      removeFromAllLists(id);
                    }}
                    className="text-red11 bg-red4 hover:bg-red5 focus:shadow-red7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none outline-none focus:shadow-[0_0_0_2px]"
                  >
                    Yes, archive this bookmark
                  </button>
                </div>
              </AlertDialog.Content>
            </AlertDialog.Portal>
          </AlertDialog.Root>

          {/* TODO: optimize, pull up so that we're only using 1 actual modal for add/remove lists */}
          {/* BUG, TODO: only for Random page, make sure we update if the bookmark has
           * been added to any or removed from all lists.  Also make sure the add/remove from lists
           * modal also updates which lists should be checked.
           */}
          <Dialog.Root
            open={isModifyListsDialogOpen}
            onOpenChange={setModifyListsDialogOpen}
          >
            <Dialog.Trigger />
            <Dialog.Portal>
              <Dialog.Overlay className="bg-blackA6 data-[state=open]:animate-overlayShow fixed inset-0" />
              <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
                <Dialog.Title className="m-0  font-medium">
                  Add to List
                </Dialog.Title>
                <form
                  onSubmit={(e) => {
                    setModifyListsDialogOpen(false);
                  }}
                  action={addRemoveFromLists.bind(
                    null,
                    shouldPreventRefresh,
                    id
                  )}
                >
                  {allLists &&
                    allLists.map((list) => (
                      <ListEntry
                        key={list.id}
                        list={list}
                        isChecked={
                          includedInLists &&
                          includedInLists.map((l) => l.listId).includes(list.id)
                        }
                      />
                    ))}
                  <div className="mt-[25px] flex justify-end">
                    <Dialog.Close asChild>
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
