import Link from "next/link";

export const ListEntry = ({ title, id, className, children }) => {
  return (
    <div className={`${className}`}>
      <Link href={`/bookmarks/list/${id}`} className="truncate">
        {children}
        {title}
      </Link>
    </div>
  );
};
