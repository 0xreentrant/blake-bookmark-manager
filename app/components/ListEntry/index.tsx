import Link from "next/link";

export const ListEntry = ({ title, id, className, children, onClick }) => {
  return (
    <div className={`${className}`}>
      <Link href={`/bookmarks/list/${id}`} className="truncate" onClick={onClick}>
        {children}
        {title}
      </Link>
    </div>
  );
};
