"use client";

import React, { cloneElement, useRef, useState, useEffect } from "react";
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
import { X, PanelRightClose, PanelRight } from "lucide-react";
import { Logo } from "@/components/Logo";

export function BookmarksLayoutWrapper({ navPanel, content }) {
  const [isNavPanelOpen, setNavPanelOpen] = useState(false);
  const parentRef = useRef();

  const navPanelWithHandler = cloneElement(navPanel, {
    handleNavSelection: () => setNavPanelOpen(false),
  });

  useEffect(() => {
    const parentContainer = parentRef.current;
    const observationCb = (event) => {
      setNavPanelOpen(false);
    };

    // need ResizeObserver for initial render to set height, otherwise 0px
    const resizeObserver = new ResizeObserver(observationCb);
    resizeObserver.observe(parentContainer);

    return () => {
      if (parentRef.current) {
        resizeObserver.unobserve(parentRef.current);
      }
    };
  }, [parentRef]);

  /* @invariant "navPanel" must always have top-level children (no wrappers encapsulating
   * the top-level children) - bookmarks list (or placeholder) and siblings (ex. title)
   * - to prevent resizing from causing flickers */

  return (
    <div className="flex flex-col lg:flex-row w-full h-screen divide-x">
      <div className="hidden lg:block">{navPanelWithHandler}</div>
      <div className="w-full h-12 flex justify-end items-center bg-notion-panel lg:hidden">
        <Sheet open={isNavPanelOpen} onOpenChange={setNavPanelOpen}>
          <SheetTrigger className="text-notion-heading/75 pr-2">
            <PanelRight />
          </SheetTrigger>
          <SheetContent side="right" className="w-52 p-0">
            <SheetHeader className="flex flex-row items-center p-2 justify-between w-full bg-notion-panel">
              <Logo />
              <SheetClose asChild>
                <X className="!m-0 text-notion-heading/75" />
              </SheetClose>
            </SheetHeader>
            {navPanelWithHandler}
          </SheetContent>
        </Sheet>
      </div>
      <div
        className="pt-4 flex flex-col flex-1 h-screen overflow-hidden relative"
        ref={parentRef}
      >
        {/* @dev: for the bookmarks list to measurements (see: resizeObserver in Bookmarks.tsx) */}
        <LayoutContext.Provider value={parentRef}>
          {content}
        </LayoutContext.Provider>
      </div>
    </div>
  );
}
