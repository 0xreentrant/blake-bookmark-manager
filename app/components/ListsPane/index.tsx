"use client";

import { useFormState } from "react-dom";
import { createList } from "../../actions";
import { Icon } from "../Icon";
import { Nav } from "./Nav";
import { ListEntry } from "../ListEntry";

export function ListsPane({ lists, totalBookmarks }) {
  const [, doCreateList] = useFormState(createList);

  return (
    <div className="flex flex-col w-48 h-screen overflow-hidden">
      {/* TODO: totalBookmarks */}
      <Nav totalBookmarks={totalBookmarks} />
      <hr className="pt-2" />

      <div className="flex justify-between px-2 pb-2">
        <span className="text-muted-foreground">Your Lists</span>
        <Icon icon="plus" onClick={() => doCreateList()} />
      </div>
      <div className="h-full px-2 overflow-y-auto">
        {lists &&
          lists.map((list) => (
            <ListEntry key={list.id} id={list.id} title={list.title} />
          ))}
      </div>
    </div>
  );
}
