"use client";

import React, { useRef } from "react";
import { BookmarksLayoutContext } from "./BookmarksLayoutContext";

export function BookmarksLayoutWrapper({ left, right }) {
  const parentRef = useRef();

  return (
    <div className="flex w-full divide-x">
      {left}
      <div className="flex-1 h-screen overflow-hidden" ref={parentRef}>
        {/* @dev: for the bookmarks list to measurements (see: resizeObserver in Bookmarks.tsx) */}
        <BookmarksLayoutContext.Provider value={parentRef}>
          {right}
        </BookmarksLayoutContext.Provider>
      </div>
    </div>
  );
}
