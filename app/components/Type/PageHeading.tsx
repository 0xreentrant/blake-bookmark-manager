import { PageHeadingWidgets } from "@/components/PageHeadingWidgets";

export function PageHeading({
  children,
  before,
  after,
  className,
  withPageHeading = true,
}: {
  children;
  className?;
  before?;
  after?;
  withPageHeading?;
}) {
  return (
    <div className="px-3">
      {withPageHeading && <PageHeadingWidgets />}
      <div className="flex justify-center">
        <div className="flex flex-col lg:flex-row w-full justify-between">
          {before}
          <div
            className={`[overflow-wrap:anywhere] max-w-[calc(100%-2rem)] flex-wrap text-wrap text-2xl lg:text-3xl font-semibold py-2 lg:pt-3 lg:pb-4 ${className}`}
          >
            {children}
          </div>
          {after}
        </div>
      </div>
    </div>
  );
}
