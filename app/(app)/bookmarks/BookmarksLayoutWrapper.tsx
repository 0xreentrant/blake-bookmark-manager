"use client";

import React, { cloneElement, useRef, useState, useEffect } from "react";
import { X, PanelRightClose, PanelRight } from "lucide-react";

import * as Dialog from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { LayoutContext } from "@/components/LayoutContext";
import { UserContext } from "@/components/UserContext";
import { Logo } from "@/components/Logo";
import {
  SheetClose,
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { BlakeUser } from "@/lib/auth";

export function BookmarksLayoutWrapper({
  navPanel,
  content,
  user,
}: {
  navPanel: any;
  content: any;
  user: BlakeUser;
}) {
  const [isNavPanelOpen, setNavPanelOpen] = useState(false);
  const [isMobileDropdownOpen, setMobileDropdownOpen] = useState(false);
  const [isLogoutDialogOpen, setLogoutDialogOpen] = useState(false);
  const router = useRouter();
  const parentRef = useRef(null);

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

  /*
   * @dev
   * @invariant "navPanel" must always have top-level children (no wrappers encapsulating
   * the top-level children) - bookmarks list (or placeholder) and siblings (ex. title)
   * - to prevent resizing from causing flickers
   */

  return (
    <UserContext.Provider value={user}>
      <div className="flex flex-col lg:flex-row w-full h-screen divide-x">
        <div className="hidden lg:block">{navPanelWithHandler}</div>
        {/* @dev this is the mobile version of page heading widgets */}
        <div className="w-full h-12 flex justify-between items-center px-2 bg-notion-panel lg:hidden">
          <Drawer
            open={isMobileDropdownOpen}
            onOpenChange={setMobileDropdownOpen}
          >
            <DrawerTrigger className="outline-none text-notion-heading">
              <Avatar>
                <AvatarImage src={user.avatar} />
                <AvatarFallback>
                  {user.givenName[0] + user.familyName[0]}
                </AvatarFallback>
              </Avatar>
            </DrawerTrigger>
            <DrawerContent className="h-screen text-notion-heading">
              <DrawerHeader className="flex items-center justify-between">
                <DrawerTitle></DrawerTitle>
                <DrawerClose className="flex items-center gap-2 text-lg">
                  Done
                </DrawerClose>
              </DrawerHeader>
              <hr />

              <ul className="divide-y">
                {/* TODO: account details 
                <li>
                  <Link
                    href={`/bookmarks/account`}
                    className="flex px-4 py-4 text-lg items-center gap-2"
                  >
                    <span>Account</span>
                  </Link>
                </li>
                */}
                <li
                  className="flex px-4 py-4 text-lg items-center gap-2"
                  onClick={() => {
                    setMobileDropdownOpen(false);
                    setLogoutDialogOpen(true);
                  }}
                >
                  {/* TODO: logout */}
                  Logout
                </li>
              </ul>
              <hr />
            </DrawerContent>
          </Drawer>

          <Sheet open={isNavPanelOpen} onOpenChange={setNavPanelOpen}>
            <SheetTrigger className="text-notion-heading/75">
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
      <Dialog.Root open={isLogoutDialogOpen} onOpenChange={setLogoutDialogOpen}>
        <Dialog.Trigger />
        <Dialog.Portal>
          <Dialog.Overlay className="bg-blackA6 data-[state=open]:animate-overlayShow fixed inset-0" />
          <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
            <Dialog.Title className="m-0  font-medium">
              Are you sure?
            </Dialog.Title>
            This will log you out of your account
            <div className="mt-2 flex justify-end gap-3">
              <Button
                variant="outline"
                onClick={() => setLogoutDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  setLogoutDialogOpen(false);
                  router.push("/logout");
                }}
              >
                Log me out
              </Button>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </UserContext.Provider>
  );
}
