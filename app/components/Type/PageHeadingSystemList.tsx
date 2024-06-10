export function PageHeadingSystemList({
  children,
  before,
  after,
  className,
}: {
  children;
  className?;
  before?;
  after?;
}) {
  return (
    <div className="flex justify-center">
      <div className="flex flex-col lg:flex-row w-full max-w-7xl justify-between">
        {before}
        <div
          className={`[overflow-wrap:anywhere] max-w-[calc(100%-2rem)] flex-wrap text-wrap text-3xl font-semibold py-2 lg:pt-3 lg:pb-4 ${className}`}
        >
          {children}
        </div>
        {after}
      </div>
    </div>
  );
}
