import Link from "next/link";

export const CachedLink = ({ link }) => (
  <Link
    target="_blank"
    href={"https://web.archive.org/web/*/" + link}
    rel="noreferrer"
  >
    (Cached Link)
  </Link>
);


