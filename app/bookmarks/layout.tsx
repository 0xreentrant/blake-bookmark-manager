"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState, useRef } from "react";
import { BookmarksLayoutContext } from "./BookmarksLayoutContext";


export default function BookmarksLayout({ children }) {
  const parentRef = useRef();
  const pathname = usePathname();
  const withActiveToggle = (t) => (pathname === t ? "uk-active" : "");

  return (
    <div className="h-screen overflow-hidden" ref={parentRef}>
      <ul className="uk-subnav uk-subnav-primary p-2">
        <li className={withActiveToggle("/bookmarks/all")}>
          <Link href="/bookmarks/all">All</Link>
        </li>{" "}
        <li className={withActiveToggle("/bookmarks/top")}>
          <Link href="/bookmarks/top">Top</Link>
        </li>{" "}
        <li className={withActiveToggle("/bookmarks/random")}>
          <Link href="/bookmarks/random">Random</Link>
        </li>{" "}
        <li className={withActiveToggle("/bookmarks/archived")}>
          <Link href="/bookmarks/archived">Archived</Link>
        </li>{" "}
      </ul>
      <BookmarksLayoutContext.Provider value={parentRef}>
        {children}
      </BookmarksLayoutContext.Provider>
    </div>
  );
}
