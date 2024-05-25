import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "../Icon";

export function Nav({ totalBookmarks }) {
  const pathname = usePathname();
  const withActiveToggle = (t) => (pathname === t ? "uk-active" : "");
  return (
    <ul className="flex flex-col uk-nav uk-nav-default">
      <li className={`${withActiveToggle("/bookmarks/all")}`}>
        <Link className="mb-0 justify-between" href="/bookmarks/all">
          <div className="flex items-center gap-x-2">
            <Icon icon="home" />
            <span>All</span>
          </div>
          <span>{totalBookmarks}</span>
        </Link>
      </li>{" "}
      <li className={`${withActiveToggle("/bookmarks/top")}`}>
        <Link className="justify-between" href="/bookmarks/top">
          <div className="flex items-center gap-x-2">
            <Icon icon="home" />
            <span>Top</span>
          </div>
        </Link>
      </li>{" "}
      <li className={`${withActiveToggle("/bookmarks/random")}`}>
        <Link className="justify-between" href="/bookmarks/random">
          <div className="flex items-center gap-x-2">
            <Icon icon="home" />
            <span>Random</span>
          </div>
        </Link>
      </li>{" "}
      <li className={`${withActiveToggle("/bookmarks/archived")}`}>
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
