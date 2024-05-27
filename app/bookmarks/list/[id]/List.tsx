"use client";

import { useEffect, useRef, useState } from "react";
import EasyEdit, { Types } from "react-easy-edit";
import * as Dialog from "@radix-ui/react-dialog";
import { Bookmarks } from "../../../components/Bookmarks";
import { IconMenuHorizontal } from "../../../components/Icon/MenuHorizontal";
import { IconMinusCircle } from "../../../components/Icon/IconMinusCircle";
import { deleteList } from "../../../actions";

export function List({ list, bookmarks, lists }) {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isDialogOpen, setDialogOpen] = useState(false);

  const handleDeleteMenuItem = (e) => {
    setMenuOpen(false);
    setDialogOpen(true);
  };

  const handlePerformDelete = async () => {
    await deleteList(list.id);
  };

  return (
    <div>
      <div className="flex justify-between">
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
                onClick={handleDeleteMenuItem}
              >
                <IconMinusCircle />
                <span className="pl-2">Delete List</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <Bookmarks bookmarks={bookmarks} allLists={lists} hasError={false} />

      <Dialog.Root open={isDialogOpen} onOpenChange={setDialogOpen}>
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
                onClick={() => setDialogOpen(false)}
              >
                Cancel
              </button>
              <button
                className="border-2 border-solid p-2"
                onClick={() => {
                  setDialogOpen(false);
                  handlePerformDelete();
                }}
              >
                Delete
              </button>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}
