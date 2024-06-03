"use client";
import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IconEdit } from "../Icon/Edit";
import { IconTrash } from "../Icon/Trash";
import { IconRefresh } from "../Icon/Refresh";
import { IconFolderAdd } from "../Icon/FolderAdd";
import { IconFolderCheck } from "../Icon/FolderCheck";
import { IconMenuHorizontal } from "@/components/Icon/MenuHorizontal";
import { addRemoveFromLists, removeFromAllLists } from "../../actions";
import { ListEntry } from "./ListEntry";
import { useRouter } from "next/navigation";
import { IconInternetArchive } from "@/components/Icon/InternetArchive";
import { IconHackerNews } from "@/components/Icon/HackerNews";
import { Points } from "./Points";

const localeOptions = {
  hour: "2-digit",
  minute: "2-digit",
  year: "numeric",
  month: "numeric",
  day: "numeric",
};

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
  const router = useRouter();
  const [isModifyListsDialogOpen, setModifyListsDialogOpen] = useState(false);
  const [isArchiveAlertOpen, setArchiveAlertOpen] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const shouldPreventRefresh = usePathname().includes("random");
  const linkInternetArchive = "https://web.archive.org/web/*/" + href;
  const linkAlgolia =
    "https://hn.algolia.com/?dateRange=all&page=0&prefix=true&query=" +
    encodeURIComponent(href);

  const includedListNames = allLists.filter(
    (list) => includedInLists && includedInLists.includes(list.id)
  );

  const handleArchiveAlert = () => {
    setArchiveAlertOpen(true);
  };

  const handleArchiveByExistenceInLists = includedInLists?.length
    ? handleArchiveAlert // handleArchive will be called by the alert form action
    : handleArchive;

  const handleActionByArchivedState = isArchived
    ? handleRestore
    : handleArchiveByExistenceInLists;

  return (
    <div className="flex justify-center p-4">
      <div
        className="flex border rounded-lg py-2 px-4 w-full max-w-5xl relative justify-start text-card-foreground"
        style={style}
      >
        <Points
          points={points}
          handleUpvote={handleUpvote}
          handleDownvote={handleDownvote}
        />

        {/* TODO: merge these doubled title and date elements w/ better tailwind css */}
        <div className="px-4 lg:px-0 lg:pl-2 grow-[5] flex flex-col lg:flex-row min-w-0 w-full whitespace-nowrap">
          <Link
            className="lg:hidden font-bold w-full truncate"
            title={title}
            href={href}
          >
            {title}
          </Link>
          <div className="block lg:hidden text-muted-foreground text-sm">
            {/* TODO: user's locale */}
            {/* @ts-ignore */}
            {new Date(date * 1000).toLocaleString("en-US", localeOptions)}
          </div>

          <div className="justify-between w-full items-center hidden lg:flex">
            <Link className="font-bold truncate" title={title} href={href}>
              {title}
            </Link>
            <span className="pl-4 text-muted-foreground text-sm">
              {/* @ts-ignore */}
              {new Date(date * 1000).toLocaleString("en-US", localeOptions)}
            </span>
          </div>
        </div>

        <div className="flex flex-col justify-between items-center lg:flex-row lg:gap-4 lg:pl-6">
          {/* TODO: use the portal to extract this from the surrounding layout markup */}
          <DropdownMenu open={isDropdownOpen} onOpenChange={setDropdownOpen}>
            <DropdownMenuTrigger>
              <IconMenuHorizontal
                onClick={() => setDropdownOpen(!isDropdownOpen)}
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>
                <IconEdit className="mr-2 h-4 w-4" />
                <Link
                  href={`/bookmarks/edit/${id}`}
                  title="Edit bookmark details"
                >
                  Edit bookmark details
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                onSelect={(e) => router.push(linkInternetArchive)}
              >
                <IconInternetArchive className="mr-2 h-4 w-4" />
                <span>Check the Internet Archive</span>
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={(e) => router.push(linkAlgolia)}>
                <IconHackerNews className="mr-2 h-4 w-4" />
                <span>Search on HackerNews</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleActionByArchivedState}>
                {isArchived ? (
                  <>
                    <IconRefresh className="mr-2 h-4 w-4" />
                    <span>Return to your bookmarks</span>
                  </>
                ) : (
                  <>
                    <IconTrash className="mr-2 h-4 w-4" />
                    <span>Archive this bookmark</span>
                  </>
                )}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {includedInLists && !includedInLists.length ? (
            <IconFolderAdd
              onClick={() => setModifyListsDialogOpen(true)}
              className="h-4 w-4"
            />
          ) : (
            <IconFolderCheck
              fill="green"
              className="h-4 w-4"
              onClick={() => setModifyListsDialogOpen(true)}
            />
          )}
        </div>
      </div>

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
              This bookmark is part of one or more lists. If you archive this
              bookmark, it will be removed from all lists it is a part of.
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
              action={addRemoveFromLists.bind(null, shouldPreventRefresh, id)}
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
  );
};
