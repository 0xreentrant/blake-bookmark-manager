import { Nav } from "@/components/Marketing/Nav";
import { Footer } from "@/components/Marketing/Footer";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/Logo";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";

export default function Page() {
  return (
    <div className="flex flex-col w-full items-center">
      <div className="flex justify-between px-3 py-2 w-full max-w-screen-2xl">
        <Logo />
        <NavigationMenu className="gap-2">
          <Link href="/blog" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Blog
            </NavigationMenuLink>
          </Link>
          <Link href="/login" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Login
            </NavigationMenuLink>
          </Link>
        </NavigationMenu>
      </div>

      <div className="flex flex-col items-center px-3 py-2 w-full max-w-screen-2xl text-center">
        <h1 className="text-[3rem] font-extrabold">
          Create Community with Your Bookmarks
        </h1>
        <p className="py-4 w-1/2">
          Create online communities with your own collection of bookmarks using
          Blake, the social bookmarks platform.
        </p>
        <Button className="w-[100px]">Try it out</Button>
      </div>

      <div className="px-3 py-2 ">
        <h1>Create a List and Now You Have a Gathering Space</h1>
        <p>
          Share your list, and people can comment, upvote and downvote links,
          add to their own lists.
        </p>
      </div>

      <div className="px-3 py-2 ">
        <h1>Make Sense of What You Bookmark</h1>
        <p>
          Your personal lists get AI-powered summaries and suggestions, so
          you'll get a sense of what interests you
        </p>
      </div>

      <div className="px-3 py-2 ">
        <h1>Join the Journey</h1>
        <p>
          Blake is built with Love by Alex Perez. Join the mailing list to get
          updates on Blake and what's going on in the software developer world.
        </p>
      </div>

      <Footer />
    </div>
  );
}
