import Link from "next/link";
export function Nothing() {
  return (
    <div className="w-full h-full flex items-center justify-center flex-col">
      <h1>Nothing Here!</h1>
      <p>
        Add bookmarks from{" "}
        <Link href="/bookmarks/all" className="underline">
          All Bookmarks
        </Link>
      </p>
    </div>
  );
}
