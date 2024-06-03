"use client";

import { useEffect, useRef, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Bookmarks } from "@/components/Bookmarks";
import { IconMenuHorizontal } from "@/components/Icon/MenuHorizontal";
import { IconMinusCircle } from "@/components/Icon/IconMinusCircle";
import { deleteList } from "@/actions";
import { editList } from "@/actions";
import { Nothing } from "@/components/DefaultViews/Nothing";

export function List({ list, bookmarks, lists }) {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [isEditDialogOpen, setEditDialogOpen] = useState(false);

  const handleDeleteMenuItem = (e) => {
    setMenuOpen(false);
    setDeleteDialogOpen(true);
  };

  const handleEditMenuItem = (e) => {
    setMenuOpen(false);
    setEditDialogOpen(true);
  };

  const handlePerformDelete = async () => {
    await deleteList(list.id);
  };

  return (
    <>
      {/* @dev THERE MUST BE NO WRAPPERS AROUND THIS, (React.Fragment only) */}
      <div className="flex justify-between px-4 py-2">
        <h1>{list.title}</h1>
        <div>
          <IconMenuHorizontal onClick={() => setMenuOpen(!isMenuOpen)} />
          <div
            style={{
              display: isMenuOpen ? "block" : "none",
            }}
          >
            <ul
              style={{
                backgroundColor: "white",
                border: "1px solid black",
                borderRadius: "1px",
              }}
            >
              <li
                className="flex items-center p-2"
                onClick={handleEditMenuItem}
              >
                <IconMinusCircle />
                <span className="pl-2">Edit details</span>
              </li>
              <li
                className="flex items-center p-2"
                onClick={handleDeleteMenuItem}
              >
                <IconMinusCircle />
                <span className="pl-2">Delete list</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {bookmarks?.length ? (
        <Bookmarks bookmarks={bookmarks} allLists={lists} />
      ) : (
        <div className="px-4">
          <Nothing />
        </div>
      )}

      <Dialog.Root open={isEditDialogOpen} onOpenChange={setEditDialogOpen}>
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
                onSubmit={() => setEditDialogOpen(false)}
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
