"use client";
import { useState, useContext } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogClose,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, Plus, CloudUpload } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { saveBookmark } from "@/lib/actions";
import { UserContext } from "@/components/UserContext";
import { ClientUser } from "@/lib/auth";

export const AddMenuButton = () => {
  const user = useContext<ClientUser>(UserContext);
  const [isDialogOpen, setDialogOpen] = useState(false);
  return (
    <div className="flex items-center">
      <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
        <DialogTrigger asChild>
          <div className="p-2 flex items-center rounded-md [border-top-right-radius:0px] [border-bottom-right-radius:0px] [border-right-width:1px] [border-right-color:white] px-3 text-heading bg-hover-bg hover:bg-slate-200">
            <Plus size={16} />
            <span className="pl-1 font-semibold">Add</span>
          </div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogDescription>
              Paste the URL and title for a new bookmark here.
            </DialogDescription>
          </DialogHeader>
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              saveBookmark(user.id, formData);
              setDialogOpen(false);
            }}
          >
            <div className="flex flex-col justify-center gap-3">
              <div className="grid flex-1 gap-2">
                <Label htmlFor="title">Title</Label>
                <Input id="title" name="title" defaultValue="" />
              </div>
              <div className="grid flex-1 gap-2">
                <Label htmlFor="href">URL</Label>
                <Input id="href" name="href" defaultValue="" />
              </div>
            </div>
            <DialogFooter className="pt-6 sm:justify-start">
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit">Save</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <DropdownMenu>
        <DropdownMenuTrigger
          asChild
          className="p-2 rounded-md [border-top-left-radius:0px] [border-bottom-left-radius:0px] px-2 text-heading bg-hover-bg hover:bg-slate-200"
        >
          <span className="text-base">
            <ChevronDown />
          </span>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuItem className="flex gap-2">
            <CloudUpload />
            <Link href="/bookmarks/upload">Upload bookmarks from file</Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
