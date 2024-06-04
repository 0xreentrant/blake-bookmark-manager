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
    <div
      className={`flex items-center lg:flex-row text-notion-base ${
        className ?? ""
      }`}
    >
      <span className="text-lg font-light">{points}</span>
      <div className="flex flex-col h-full justify-between pl-4 lg:flex-row lg:items-center lg:gap-2.5 lg:pl-3">
        <IconChevronUp onClick={handleUpvote} />
        <IconChevronDown onClick={handleDownvote} />
      </div>
    </div>
  );
}
