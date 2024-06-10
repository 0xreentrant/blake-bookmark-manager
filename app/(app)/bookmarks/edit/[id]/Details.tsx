"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
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
import * as Dialog from "@radix-ui/react-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useAutosave } from "react-autosave";
import Editor from "@monaco-editor/react";
import { saveNote, editBookmark } from "@/actions";
import { Pencil, ArrowLeft, Ellipsis } from "lucide-react";

export function Details({ entry }) {
  const { id, points, href, title, date, notes } = entry;
  const [isDesktopDropdownOpen, setDesktopDropdownOpen] = useState(false);
  const [isMenuOpenMobile, setMenuOpenMobile] = useState(false);
  const [isEditDialogOpenDesktop, setEditDialogOpenDesktop] = useState(false);
  const [isEditDrawerOpenMobile, setEditDrawerOpenMobile] = useState(false);
  const [text, setText] = useState(notes);
  const [newTitle, setNewTitle] = useState(title);
  const router = useRouter();

  const handleEditMenuItemMobile = (e) => {
    setMenuOpenMobile(false);
    setEditDrawerOpenMobile(true);
  };

  useAutosave({
    data: text,
    interval: 700,
    onSave: (data) => {
      saveNote(id, data, null);
    },
  });

  return (
    <>
      <div className="flex p-2" style={{}}>
        <div className="flex flex-col lg:flex-row grow max-w-[calc(100%-1.25rem)] pl-2 item-center">
          <div className="flex flex-col lg:flex-row mb-3 lg:mb-2 lg:mr-3 grow-[5] gap-3">
            <div className="flex gap-3" onClick={() => router.back()}>
              <ArrowLeft />
              <span className="underline lg:hidden">Back to list</span>
            </div>
            <div className="flex">
              <span className="font-bold">{title}</span>
            </div>
          </div>
          <div className="hidden lg:block">
            <DropdownMenu
              open={isDesktopDropdownOpen}
              onOpenChange={setDesktopDropdownOpen}
            >
              <DropdownMenuTrigger>
                <span className="text-notion-base">
                  <Ellipsis
                    onClick={() =>
                      setDesktopDropdownOpen(!isDesktopDropdownOpen)
                    }
                  />
                </span>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem
                  onClick={() => setEditDialogOpenDesktop(true)}
                >
                  <Pencil className="mr-2 h-4 w-4" />
                  <span>Edit title</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="block lg:hidden pr-2">
          <Drawer open={isMenuOpenMobile} onOpenChange={setMenuOpenMobile}>
            <DrawerTrigger
              className="outline-none h-min text-notion-heading p-1 w-10 h-10 rounded-full bg-notion-hover-bg"
              asChild
            >
              <Ellipsis />
            </DrawerTrigger>
            <DrawerContent className="h-screen">
              <DrawerHeader className="flex items-center justify-between">
                <DrawerTitle>List Options</DrawerTitle>
                <DrawerClose className="flex items-center gap-2 text-lg">
                  Done
                </DrawerClose>
              </DrawerHeader>
              <hr />

              <ul className="divide-y">
                <li
                  className="flex px-2 py-4 text-lg items-center"
                  onClick={handleEditMenuItemMobile}
                >
                  <Pencil size={18} />
                  <span className="pl-2">Edit details</span>
                </li>
              </ul>
              <hr />
            </DrawerContent>
          </Drawer>
        </div>
      </div>

      <hr />

      <div className="p-4">
        <span className="font-medium">Notes</span>
        <div className="border-2 border-slate">
          <Editor
            height="50vh"
            defaultLanguage="markdown"
            defaultValue={notes}
            onChange={(data) => setText(data)}
            options={{
              suggest: {
                showWords: false,
              },
            }}
          />
        </div>
      </div>

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
                action={editBookmark.bind(null, id)}
                onSubmit={() => setEditDialogOpenDesktop(false)}
              >
                <div>
                  <div>Title</div>
                  <input
                    id="title"
                    type="text"
                    name="title"
                    defaultValue={title}
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

      <Drawer
        open={isEditDrawerOpenMobile}
        onOpenChange={setEditDrawerOpenMobile}
      >
        <DrawerContent className="h-screen">
          <DrawerHeader className="flex items-center justify-between">
            <DrawerTitle>Edit Title</DrawerTitle>
            <DrawerClose className="flex items-center gap-2 text-lg">
              Done
            </DrawerClose>
          </DrawerHeader>
          <hr />

          <div className="mt-2 px-2 flex justify-end">
            <form
              className="w-full"
              action={editBookmark.bind(null, id)}
              onSubmit={() => setEditDrawerOpenMobile(false)}
            >
              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  type="text"
                  name="title"
                  className="border-2 border-solid"
                  defaultValue={title}
                  onChange={(e) => setNewTitle(newTitle)}
                />
              </div>
            </form>
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
}
