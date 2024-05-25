export const Entry = ({ style, entry, onClick }) => {
  const CachedLink = ({ link }) => (
    <a
      target="_blank"
      href={"https://web.archive.org/web/*/" + link} rel="noreferrer"
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
      } rel="noreferrer"
    >
      (HN)
    </a>
  );

  return (
    <div className="flex uk-card uk-card-body" style={style}>
      <div className="flex flex-col items-center">
        {entry.score}
        <div className="flex flex-col">
          <span uk-icon="chevron-up"></span>
          <span uk-icon="chevron-down"></span>
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
          <span uk-icon="trash" onClick={() => onClick(entry.id)}></span>
      </div>
     </div>
  );
};
