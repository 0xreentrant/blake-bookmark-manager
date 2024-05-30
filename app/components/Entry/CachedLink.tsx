import Link from "next/link";
import { IconInternetArchive} from '@/components/Icon/InternetArchive'

export const CachedLink = ({ link }) => (
  <Link
    target="_blank"
    href={"https://web.archive.org/web/*/" + link}
    rel="noreferrer"
  >
    <IconInternetArchive />
  </Link>
);
