import { IconChevronDown } from "../Icon/ChevronDown";
import { IconChevronUp } from "../Icon/ChevronUp";
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
          <IconChevronUp onClick={handleUpvote} />
          <IconChevronDown onClick={handleDownvote} />
        </div>
      </div>
      <div
        className={`flex lg:hidden flex-col h-full justify-between items-center text-notion-base ${
          className ?? ""
        }`}
      >
        <IconChevronUp onClick={handleUpvote} />
        <span className="text-xs font-light">{points}</span>
        <IconChevronDown onClick={handleDownvote} />
      </div>
    </>
  );
}
