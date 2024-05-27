import Link from "next/link";

export const HNLink = ({ link }) => (
  <Link
    target="_blank"
    href={
      "https://hn.algolia.com/?dateRange=all&page=0&prefix=true&query=" +
      encodeURIComponent(link)
    }
    rel="noreferrer"
  >
    (HN)
  </Link>
);
