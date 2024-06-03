import Link from "next/link";
export function Nothing() {
  return (
    <>
      <h1>Nothing Here!</h1>
      <p>
        Add bookmarks from <Link href="/bookmarks/all">All Lists</Link>
      </p>
    </>
  );
}
