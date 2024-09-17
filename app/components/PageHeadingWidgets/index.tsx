"use client";
import { useState, useContext } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import Link from "next/link";
import { AddMenuButton } from "@/components/PageHeadingWidgets/AddMenuButton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { UserContext } from "@/components/UserContext";
import { ClientUser } from "@/lib/auth";

export function PageHeadingWidgets() {
  const user = useContext<ClientUser>(UserContext);
  const [isDesktopDropdownOpen, setDesktopDropdownOpen] = useState(false);
  const [isLogoutDialogOpen, setLogoutDialogOpen] = useState(false);
  const router = useRouter();

  /*
   * @dev This is the desktop version of the page heading widgets
   */

  return (
    <>
      <div className="pt-2 flex justify-between">
        <AddMenuButton />
        <div className="hidden lg:flex">
          <DropdownMenu
            open={isDesktopDropdownOpen}
            onOpenChange={setDesktopDropdownOpen}
          >
            <DropdownMenuTrigger>
              <Avatar>
                <AvatarImage src={user.googleAvatar} />
                <AvatarFallback>
                  {user.givenName[0] + user.familyName[0]}
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {/* TODO: account page 
              <DropdownMenuItem>
                <Link href={`/bookmarks/account`} title="Bookmark details">n
                  Account
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              */}
              <DropdownMenuItem onClick={() => setLogoutDialogOpen(true)}>
                <span>Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
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
    </>
  );
}
