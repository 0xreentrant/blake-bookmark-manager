"use client";

import { useEffect, useRef, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { useRouter } from "next/navigation";
import { Bookmarks } from "@/components/Bookmarks";
import { deleteList } from "@/actions";
import { editList } from "@/actions";
import { NothingList } from "@/components/DefaultViews/NothingList";
import { PageHeading } from "@/components/Type/PageHeading";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { ArrowLeft, Pencil, Trash2, Ellipsis } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function List({ list, bookmarks, lists }) {
  const [isMenuOpenDesktop, setMenuOpenDesktop] = useState(false);
  const [isMenuOpenMobile, setMenuOpenMobile] = useState(false);
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [isEditDialogOpenDesktop, setEditDialogOpenDesktop] = useState(false);
  const [isEditDrawerOpenMobile, setEditDrawerOpenMobile] = useState(false);
  const [newTitle, setNewTitle] = useState(list.title);
  const router = useRouter();

  const handleDeleteMenuItem = (e) => {
    setMenuOpenMobile(false);
    setMenuOpenDesktop(false);
    setDeleteDialogOpen(true);
  };

  const handleEditMenuItemDesktop = (e) => {
    setMenuOpenDesktop(false);
    setEditDialogOpenDesktop(true);
  };

  const handleEditMenuItemMobile = (e) => {
    setMenuOpenMobile(false);
    setEditDrawerOpenMobile(true);
  };

  const handlePerformDelete = async () => {
    await deleteList(list.id);
  };

  return (
    /* @dev THERE MUST BE NO WRAPPERS AROUND THIS FILE'S ENTIRE REACT COMPONENT, (React.Fragment only) */
    <>
      <div className="flex justify-center lg:items-center pb-2 px-3 lg:pb-4 lg:pt-3">
        <div className="flex flex-col lg:flex-row grow-[5] lg:items-center gap-1 lg:gap-3">
          <div className="flex gap-3 lg:hidden" onClick={() => router.back()}>
            <ArrowLeft />
            <span className="underline">All bookmarks</span>
          </div>
          <div
            className={`[overflow-wrap:anywhere] flex flex-wrap text-wrap text-2xl lg:text-3xl font-semibold`}
          >
            {list.title}
          </div>
        </div>
        <div className="lg:hidden text-notion-base">
          <Drawer open={isMenuOpenMobile} onOpenChange={setMenuOpenMobile}>
            <DrawerTrigger
              className="outline-none text-notion-heading mr-2 p-1 w-10 h-10 rounded-full bg-notion-hover-bg flex justify-center items-center"
              asChild
            >
              <Ellipsis />
            </DrawerTrigger>
            <DrawerContent className="h-screen text-notion-heading">
              <DrawerHeader className="flex items-center  justify-between">
                <DrawerTitle>List Options</DrawerTitle>
                <DrawerClose className="flex items-center gap-2 text-lg">
                  Done
                </DrawerClose>
              </DrawerHeader>
              <hr />

              <ul className="divide-y">
                <li
                  className="flex px-4 py-4 text-lg items-center"
                  onClick={handleEditMenuItemMobile}
                >
                  <Pencil size={18} />
                  <span className="pl-2">Edit details</span>
                </li>
                <li
                  className="flex px-4 py-4 text-lg items-center"
                  onClick={handleDeleteMenuItem}
                >
                  <Trash2 size={18} />
                  <span className="pl-2">Delete list</span>
                </li>
              </ul>
              <hr />
            </DrawerContent>
          </Drawer>
        </div>
        <div className="hidden lg:block">
          <DropdownMenu
            open={isMenuOpenDesktop}
            onOpenChange={setMenuOpenDesktop}
          >
            <DropdownMenuTrigger className="outline-none text-notion-heading">
              <Ellipsis size={16} />
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              alignOffset={15}
              className="text-notion-heading"
            >
              <DropdownMenuLabel>List Options</DropdownMenuLabel>
              <DropdownMenuItem onClick={handleEditMenuItemDesktop}>
                <Pencil size={16} />
                <span className="pl-2">Edit details</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleDeleteMenuItem}>
                <Trash2 size={16} />
                <span className="pl-2">Delete list</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* TODO: pull up NothingList to page */}
      {bookmarks?.length ? (
        <Bookmarks bookmarks={bookmarks} allLists={lists} />
      ) : (
          <NothingList />
      )}

      <Drawer
        open={isEditDrawerOpenMobile}
        onOpenChange={setEditDrawerOpenMobile}
      >
        <DrawerContent className="h-screen text-notion-heading">
          <form
            action={editList.bind(null, list.id)}
            onSubmit={() => setEditDrawerOpenMobile(false)}
          >
            <DrawerHeader className="flex items-center justify-between">
              <DrawerTitle>Edit details</DrawerTitle>
              <DrawerClose className="flex items-center gap-2 text-lg">
                Done
              </DrawerClose>
            </DrawerHeader>
            <hr />

            <div className="mt-2 px-4">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                type="text"
                name="title"
                className="border-2 border-solid"
                defaultValue={list.title}
                onChange={(e) => setNewTitle(newTitle)}
              />
            </div>
          </form>
        </DrawerContent>
      </Drawer>

      <Dialog.Root
        open={isEditDialogOpenDesktop}
        onOpenChange={setEditDialogOpenDesktop}
      >
        <Dialog.Trigger />
        <Dialog.Portal>
          <Dialog.Overlay className="bg-blackA6 data-[state=open]:animate-overlayShow fixed inset-0" />
          <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
            <Dialog.Title className="m-0  font-medium">
              Edit details
            </Dialog.Title>

            <div className="mt-2 flex justify-end">
              <form
                className="w-full"
                action={editList.bind(null, list.id)}
                onSubmit={() => setEditDialogOpenDesktop(false)}
              >
                <div>
                  <div>Title</div>
                  <input
                    id="title"
                    type="text"
                    name="title"
                    defaultValue={list.title}
                    className="border-2 border-solid "
                  />
                </div>

                <Dialog.Close asChild>
                  <button className="border-2 border-solid p-2 mr-4">
                    Cancel
                  </button>
                </Dialog.Close>
                <button type="submit" className="border-2 border-solid p-2">
                  Save
                </button>
              </form>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

      <Dialog.Root open={isDeleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <Dialog.Trigger />
        <Dialog.Portal>
          <Dialog.Overlay className="bg-blackA6 data-[state=open]:animate-overlayShow fixed inset-0" />
          <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
            <Dialog.Title className="m-0  font-medium">
              Are you sure?
            </Dialog.Title>
            This will delete your list &quot;{list.title}&quot;
            <div className="mt-2 flex justify-end">
              <button
                className="border-2 border-solid p-2 mr-4"
                onClick={() => setDeleteDialogOpen(false)}
              >
                Cancel
              </button>
              <button
                className="border-2 border-solid p-2"
                onClick={() => {
                  setDeleteDialogOpen(false);
                  handlePerformDelete();
                }}
              >
                Delete
              </button>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
}
