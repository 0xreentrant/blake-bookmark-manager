import Link from "next/link";
export function InfoBanner({ className }: { className?: string }) {
  return (
    <div
      className={`flex items-center justify-center  w-full bg-burntsienna ${className}`}
    >
      <div className="text-lg font-bold">
        UPDATE September 2nd, 2024 -{" "}
        <Link href="/updates" className="font-medium">
          Beta Release: Latest updates and known bugs,{" "}
          <span className="underline">click here!</span>
        </Link>
      </div>
    </div>
  );
}
