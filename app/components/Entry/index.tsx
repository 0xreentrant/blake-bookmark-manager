import Icon from "./AsyncIcon";

type Bookmark = any;

export const Entry = ({
  style,
  entry,
  doArchive,
  doRestore,
}: {
  style;
  entry: Bookmark;
  doArchive;
  doRestore;
}) => {
  const isArchived = entry.archived == 1;
  const CachedLink = ({ link }) => (
    <a
      target="_blank"
      href={"https://web.archive.org/web/*/" + link}
      rel="noreferrer"
    >
      (Cached Link)
    </a>
  );

  const HNLink = ({ link }) => (
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

  return (
    <div className="flex uk-card uk-card-body" style={style}>
      <div className="flex flex-col items-center">
        {entry.score}
        <div className="flex flex-col">
          <Icon icon="chevron-up"></Icon>
          <Icon icon="chevron-down"></Icon>
        </div>
      </div>
      <div>
        <h3 className="uk-card-title">
          <a href={entry.href}>{entry.title}</a>
        </h3>
        {new Date(entry.date * 1000).toLocaleString()}
        <hr />
        <CachedLink link={entry.href} />
        <HNLink link={entry.href} />
        {isArchived ? (
          <Icon
            icon="refresh"
            onClick={() => {
              console.log({ restoring: entry.id, doRestore });
              doRestore(entry.id);
            }}
          ></Icon>
        ) : (
          <Icon
            icon="trash"
            onClick={() => {
              console.log({ archiving: entry.id, doArchive });
              doArchive(entry.id);
            }}
          ></Icon>
        )}
      </div>
    </div>
  );
};
