import Link from "next/link";
export function NothingList() {
  return (
    <div className="absolute pointer-events-none w-full h-full flex items-center justify-center flex-col">
      <h1>Nothing Here!</h1>
      <p className="pointer-events-auto">
        Add bookmarks from{" "}
        <Link href="/bookmarks/all" className="underline">
          All Bookmarks
        </Link>
      </p>
    </div>
  );
}
