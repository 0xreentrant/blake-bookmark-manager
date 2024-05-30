import Link from "next/link";
import { IconHackerNews } from "@/components/Icon/HackerNews";

export const HNLink = ({ link }) => (
  <Link
    target="_blank"
    href={
      "https://hn.algolia.com/?dateRange=all&page=0&prefix=true&query=" +
      encodeURIComponent(link)
    }
    rel="noreferrer"
  >
    <IconHackerNews />
  </Link>
);
