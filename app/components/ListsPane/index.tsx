"use client";

import { useEffect } from "react";
import { useFormState } from "react-dom";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { createList } from "../../actions";
import { IconPlus } from "../Icon/Plus";
import { Nav } from "./Nav";
import { ListEntry } from "../ListEntry";
import { withActiveToggle } from "@/utils/ui";

export function ListsPane({ lists, totalBookmarks }) {
  const [listData, doCreateList] = useFormState(createList);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!listData) {
      return;
    }
    const id = listData.id;
    router.push(`/bookmarks/list/${id}`);
  }, [listData]);

  return (
    <div className="flex flex-col w-48 px-2 mt-4 h-screen overflow-hidden">
      {/* TODO: totalBookmarks */}
      <Nav totalBookmarks={totalBookmarks} />
      <hr className="" />

      <div className="flex justify-between px-3 pt-4 pb-2">
        <span className="font-medium">Your Lists</span>
        <IconPlus onClick={() => doCreateList()} />
      </div>
      <div className="h-full overflow-y-auto">
        {lists &&
          lists.map((list) => (
            <ListEntry
              key={list.id}
              id={list.id}
              title={list.title}
              className={`${withActiveToggle(
                pathname,
                "/bookmarks/list/" + list.id,
                "font-bold bg-accent"
              )} px-3 w-full inline-flex items-center whitespace-nowrap text-sm  ring-offset-background transition-colors  hover:bg-accent hover:text-accent-foreground h-9 rounded-md justify-start`}
            >
              <span className="text-xs font-medium pr-2 ">
                {list.bookmarksCount}
              </span>
            </ListEntry>
          ))}
      </div>
    </div>
  );
}
