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
      className={`flex flex-col items-center lg:flex-row lg:pr-1.5 ${className ?? ''}`}
    >
      {points}
      <div className="flex flex-col lg:flex-row lg:gap-1.5 lg:pl-2">
        <IconChevronUp onClick={handleUpvote} />
        <IconChevronDown onClick={handleDownvote} />
      </div>
    </div>
  );
}
