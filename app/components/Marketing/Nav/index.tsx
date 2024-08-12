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

export function Nav() {
  return (
    <div className="flex justify-between px-3 py-2">
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
  );
}
