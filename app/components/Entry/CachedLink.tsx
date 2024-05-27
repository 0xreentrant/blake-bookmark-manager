export const CachedLink = ({ link }) => (
  <a
    target="_blank"
    href={"https://web.archive.org/web/*/" + link}
    rel="noreferrer"
  >
    (Cached Link)
  </a>
);


