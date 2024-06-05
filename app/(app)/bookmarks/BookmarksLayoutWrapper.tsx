"use client";

import React, { useRef } from "react";
import {
  SheetClose,
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { LayoutContext } from "@/components/LayoutContext";
import { PanelRightClose, PanelRight } from "lucide-react";
import { Logo } from "@/components/Logo";

export function BookmarksLayoutWrapper({ left, right }) {
  const parentRef = useRef();

  /* @invariant "right" must always have top-level children (no wrappers encapsulating
   * the top-level children) - bookmarks list (or placeholder) and siblings (ex. title)
   * - to prevent resizing from causing flickers */

  return (
    <div className="flex flex-col lg:flex-row w-full h-screen divide-x">
      <div className="hidden lg:block">{left}</div>
      <div className="w-full h-12 flex justify-end items-center bg-notion-panel lg:hidden">
        <Sheet>
          <SheetTrigger className="text-notion-heading/75 pr-2">
            <PanelRight />
          </SheetTrigger>
          <SheetContent side="right" className="w-52 p-0">
            <SheetHeader className="flex flex-row items-center p-2 justify-between w-full bg-notion-panel">
              <Logo />
              <SheetClose asChild>
                <PanelRightClose className="!m-0 text-notion-heading/75" />
              </SheetClose>
            </SheetHeader>
            {left}
          </SheetContent>
        </Sheet>
      </div>
      <div
        className="pt-4 flex flex-col flex-1 h-screen overflow-hidden"
        ref={parentRef}
      >
        {/* @dev: for the bookmarks list to measurements (see: resizeObserver in Bookmarks.tsx) */}
        <LayoutContext.Provider value={parentRef}>
          {right}
        </LayoutContext.Provider>
      </div>
    </div>
  );
}
