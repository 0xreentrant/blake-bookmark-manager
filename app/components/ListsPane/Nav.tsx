import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "../Icon";
import { withActiveToggle } from "../utils/ui";

export function Nav({ totalBookmarks }) {
  const pathname = usePathname();
  return (
    <ul className="flex flex-col uk-nav uk-nav-default py-2">
      <li className={`${withActiveToggle(pathname,"/bookmarks/all")}`}>
        <Link
          className="mb-0 items-center justify-between"
          href="/bookmarks/all"
        >
          <div className="flex gap-x-2">
            <Icon icon="home" />
            <span>All</span>
          </div>
          <span className="text-black text-xs">{totalBookmarks}</span>
        </Link>
      </li>{" "}
      <li className={`${withActiveToggle(pathname,"/bookmarks/top")}`}>
        <Link className="justify-between" href="/bookmarks/top">
          <div className="flex items-center gap-x-2">
            <Icon icon="home" />
            <span>Top</span>
          </div>
        </Link>
      </li>{" "}
      <li className={`${withActiveToggle(pathname,"/bookmarks/random")}`}>
        <Link className="justify-between" href="/bookmarks/random">
          <div className="flex items-center gap-x-2">
            <Icon icon="home" />
            <span>Random</span>
          </div>
        </Link>
      </li>{" "}
      <li className={`${withActiveToggle(pathname,"/bookmarks/archived")}`}>
        <Link className="justify-between" href="/bookmarks/archived">
          <div className="flex items-center gap-x-2">
            <Icon icon="home" />
            <span>Archived</span>
          </div>
        </Link>
      </li>{" "}
    </ul>
  );
}
