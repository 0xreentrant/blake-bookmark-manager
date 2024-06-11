import Link from "next/link";
export function Nothing() {
  return (
    <div className="absolute w-full h-full flex items-center justify-center flex-col">
      <h1>Nothing Here!</h1>
      <p>There are no bookmarks saved to your account.</p>
    </div>
  );
}
