import Link from "next/link";
import { Icon } from "../Icon";

export const CachedLink = ({ link }) => (
  <a
    target="_blank"
    href={"https://web.archive.org/web/*/" + link}
    rel="noreferrer"
  >
    (Cached Link)
  </a>
);

export const HNLink = ({ link }) => (
  <a
    target="_blank"
    href={
      "https://hn.algolia.com/?dateRange=all&page=0&prefix=true&query=" +
      encodeURIComponent(link)
    }
    rel="noreferrer"
  >
    (HN)
  </a>
);

export const Entry = ({
  id,
  isArchived,
  points,
  href,
  title,
  date,
  handleArchive,
  handleRestore,
  handleUpvote,
  handleDownvote,
  handleOpenModal,
  style,
}: {
  id;
  isArchived;
  points;
  href;
  title;
  date;
  handleArchive;
  handleRestore;
  handleUpvote;
  handleDownvote;
  handleOpenModal?;
  style?;
}) => {
  // TODO: remove the border and fix the spacing between entries
  return (
    <div className="flex border rounded-lg" style={style}>
      <div className="flex flex-col items-center">
        {points}
        <div className="flex flex-col">
          <Icon icon="chevron-up" onClick={handleUpvote}></Icon>
          <Icon icon="chevron-down" onClick={handleDownvote}></Icon>
        </div>
      </div>
      <div>
        <h3 className="uk-card-title">
          <a href={href}>{title}</a>
        </h3>
        {new Date(date * 1000).toLocaleString()}
        <hr />
        <CachedLink link={href} />
        <HNLink link={href} />
        {isArchived ? (
          <Icon icon="refresh" onClick={handleRestore} />
        ) : (
          <Icon icon="trash" onClick={handleArchive} />
        )}
        <Link href={`/bookmarks/edit/${id}`}>
          <Icon icon="file-edit" />
        </Link>{" "}
        {handleOpenModal &&
          <Icon icon="folder" onClick={handleOpenModal} />
          }
      </div>
    </div>
  );
};
