import Link from "next/link";

export const ListEntry = ({ title, id }) => {
  return (
    <div>
      <Link href={`/bookmarks/list/${id}`}>{title}</Link>
    </div>
  );
};
