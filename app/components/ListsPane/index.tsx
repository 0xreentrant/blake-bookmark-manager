"use client";

import { useContext, useState } from "react";
import { useFormState } from "react-dom";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { createList } from "../../lib/actions";
import { IconPlus } from "../Icon/Plus";
import Link from "next/link";
import { IconHome } from "../Icon/Home";
import { ListEntry } from "../ListEntry";
import { withActiveToggle } from "@/lib/ui";
import { UserContext } from "@/components/UserContext";
import { ClientUser } from "@/lib/auth";

export function ListsPane({ lists, totalBookmarks, handleNavSelection }) {
  const user = useContext<ClientUser>(UserContext);
  const router = useRouter();
  const pathname = usePathname();

  return (
    <>
      {/* @dev padding top is here for mobile/desktop transition + space for nav toggle icons */}
      <div className="flex flex-col w-52 pt-2 lg:pt-4 px-2 lg:pt-2.5 h-screen overflow-hidden bg-panel">
        <ul className="flex flex-col gap-y-3 px-2 pb-6 pt-2 font-normal text-heading">
          <li className="">
            <Link
              onClick={handleNavSelection}
              className={`${withActiveToggle(
                pathname,
                "/bookmarks/all"
              )} flex items-center justify-between hover:underline`}
              href="/bookmarks/all"
            >
              <div className="flex items-center gap-x-2">
                <IconHome />
                <span className="">All</span>
              </div>
              <span className="text-black text-xs hover:!no-underline">
                {totalBookmarks}
              </span>
            </Link>
          </li>
          <li className="">
            <Link
              onClick={handleNavSelection}
              className={`${withActiveToggle(
                pathname,
                "/bookmarks/top"
              )} justify-between`}
              href="/bookmarks/top"
            >
              <div className="flex items-center gap-x-2">
                <IconHome />
                <span className="hover:underline">Top</span>
              </div>
            </Link>
          </li>
          <li className="">
            <Link
              onClick={handleNavSelection}
              className={`${withActiveToggle(
                pathname,
                "/bookmarks/archived"
              )} justify-between`}
              href="/bookmarks/archived"
            >
              <div className="flex items-center gap-x-2">
                <IconHome />
                <span className="hover:underline">Archived</span>
              </div>
            </Link>
          </li>
        </ul>

        <hr className="" />

        <div className="flex justify-between items-center px-3 pt-4 pb-2">
          <span className="font-medium text-heading">Your Lists</span>
          <IconPlus
            className="hover:cursor-pointer"
            onClick={async () => {
              const listId = await createList("New List", user.id);
              handleNavSelection();
              router.push(`/bookmarks/list/${listId}`);
            }}
          />
        </div>
        <div className="h-full overflow-y-auto">
          {lists &&
            lists.map((list) => (
              <ListEntry
                key={list.id}
                id={list.id}
                title={list.title}
                onClick={handleNavSelection}
                className={`${withActiveToggle(
                  pathname,
                  "/bookmarks/list/" + list.id,
                  "font-bold bg-hover-bg"
                )} w-full px-3 inline-flex items-center whitespace-nowrap text-sm  ring-offset- transition-colors  text-base hover:bg-hover-bg hover:text-active h-8 rounded-md justify-start`}
              >
                <span className="text-xs font-medium pr-2 ">
                  {list.bookmarksCount}
                </span>
              </ListEntry>
            ))}
        </div>
      </div>
    </>
  );
}
