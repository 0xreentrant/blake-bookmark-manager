import Link from "next/link";

export const ListEntry = ({ title, id, className, children }) => {
  return (
    <div className="truncate">
      <Link className={className} href={`/bookmarks/list/${id}`}>
        {children}
        {title}
      </Link>
    </div>
  );
};
