import { ChevronUp, ChevronDown } from "lucide-react";
export function Points({
  points,
  handleUpvote,
  handleDownvote,
  className,
}: {
  points;
  handleUpvote;
  handleDownvote;
  className?;
}) {
  return (
    <>
      <div
        className={`hidden lg:flex flex-row items-center pr-1.5 text-notion-base ${
          className ?? ""
        }`}
      >
        <span className="text-sm font-light">{points}</span>
        <div className="flex items-center gap-2.5 pl-3">
          <ChevronUp onClick={handleUpvote} strokeWidth={1} />
          <ChevronDown onClick={handleDownvote} strokeWidth={1} />
        </div>
      </div>
      <div
        className={`flex lg:hidden flex-col h-full justify-between items-center text-notion-base ${
          className ?? ""
        }`}
      >
        <ChevronUp onClick={handleUpvote} strokeWidth={1} />
        <span className="text-xs font-light">{points}</span>
        {points > 0 ? (
          <ChevronDown onClick={handleDownvote} strokeWidth={1} />
        ) : (
          <ChevronDown strokeWidth={1} color="#ccc" />
        )}
      </div>
    </>
  );
}
