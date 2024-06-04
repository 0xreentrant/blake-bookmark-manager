import Link from "next/link";
import { usePathname } from "next/navigation";
import { withActiveToggle } from "@/utils/ui";
import { IconHome } from "../Icon/Home";
export function Nav({ totalBookmarks }) {
  const pathname = usePathname();
  return (
    <ul className="flex flex-col gap-y-3 px-2 pb-6 pt-2 font-normal text-notion-heading">
      <li className="">
        <Link
          className={`${withActiveToggle(
            pathname,
            "/bookmarks/all"
          )} flex items-center justify-between hover:underline`}
          href="/bookmarks/all"
        >
          <div className="flex items-center gap-x-2">
            <IconHome />
            <span className="">All</span>
          </div>
          <span className="text-black text-xs hover:!no-underline">
            {totalBookmarks}
          </span>
        </Link>
      </li>
      <li className="">
        <Link
          className={`${withActiveToggle(
            pathname,
            "/bookmarks/top"
          )} justify-between`}
          href="/bookmarks/top"
        >
          <div className="flex items-center gap-x-2">
            <IconHome />
            <span className="hover:underline">Top</span>
          </div>
        </Link>
      </li>
      <li className="">
        <Link
          className={`${withActiveToggle(
            pathname,
            "/bookmarks/random"
          )} justify-between`}
          href="/bookmarks/random"
        >
          <div className="flex items-center gap-x-2">
            <IconHome />
            <span className="hover:underline">Random</span>
          </div>
        </Link>
      </li>
      <li className="">
        <Link
          className={`${withActiveToggle(
            pathname,
            "/bookmarks/archived"
          )} justify-between`}
          href="/bookmarks/archived"
        >
          <div className="flex items-center gap-x-2">
            <IconHome />
            <span className="hover:underline">Archived</span>
          </div>
        </Link>
      </li>
    </ul>
  );
}
