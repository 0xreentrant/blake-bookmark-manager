"use client";

import React, { useRef } from "react";
import { LayoutContext } from "@/components/LayoutContext";

export function BookmarksLayoutWrapper({ left, right }) {
  const parentRef = useRef();

  /* @invariant "right" must always have 2 children: the title and the bookmarks list (or placeholder) to prevent resizing from causing flickers */

  return (
    <div className="flex w-full divide-x">
      {left}
      <div className="flex flex-col flex-1 h-screen overflow-hidden" ref={parentRef}>
        {/* @dev: for the bookmarks list to measurements (see: resizeObserver in Bookmarks.tsx) */}
        <LayoutContext.Provider value={parentRef}>
          {right}
        </LayoutContext.Provider>
      </div>
    </div>
  );
}
