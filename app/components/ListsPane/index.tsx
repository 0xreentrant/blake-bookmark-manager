"use client";

import { Icon } from "../Icon";
import { Nav } from "./Nav";
import { useFormState } from "react-dom";
import { createList } from "../../actions";

export function ListsPane({ lists }) {
  const [res, doCreateList] = useFormState(createList);

  return (
    <div className="w-48 h-screen">
      {/* TODO: totalBookmarks */}
      <Nav totalBookmarks={0} />
      <div className="flex justify-between">
        <span>Your Lists</span>
        <Icon icon="plus" onClick={() => doCreateList()} />
      </div>
      <div>{lists && lists.map((list) => <div key={list.id}>{list.title}</div>)}</div>
    </div>
  );
}
