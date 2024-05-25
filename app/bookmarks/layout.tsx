"use client";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";

export default function BookmarksLayout({ children }) {
  const pathname = usePathname();
  const withActiveToggle = (t) => (pathname === t ? "uk-active" : "");
  return (
    <>
      <ul className="uk-subnav uk-subnav-primary p-2">
        <li className={withActiveToggle("/")}>
          <Link href="/bookmarks/all">All</Link>
        </li>{" "}
        <li>
          <Link href="/bookmarks/random">Random</Link>
        </li>{" "}
      </ul>
      {children}
    </>
  );
}
