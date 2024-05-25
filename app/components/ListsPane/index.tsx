"use client";

import { useFormState } from "react-dom";
import Link from "next/link";
import { createList } from "../../actions";
import { Icon } from "../Icon";
import { Nav } from "./Nav";

const ListEntry = ({ title, id }) => {
  return (
    <div>
      <Link href={`/bookmarks/list/${id}`}>{title}</Link>
    </div>
  );
};

export function ListsPane({ lists, totalBookmarks }) {
  const [res, doCreateList] = useFormState(createList);

  return (
    <div className="w-48 h-screen p-2 overflow-hidden">
      {/* TODO: totalBookmarks */}
      <Nav totalBookmarks={totalBookmarks} />
      <hr className="pt-2" />

      <div className="flex justify-between pb-2">
        <span className="text-muted-foreground">Your Lists</span>
        <Icon icon="plus" onClick={() => doCreateList()} />
      </div>
      <div className="h-100 overflow-scroll">
        {lists &&
          lists.map((list) => (
            <ListEntry key={list.id} id={list.id} title={list.title} />
          ))}
      </div>
    </div>
  );
}
