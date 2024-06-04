export function PageHeading({
  children,
  after,
  className,
}: {
  children;
  className?;
  after?;
}) {
  return (
    <div className="flex justify-center px-2">
      <div className="flex w-full max-w-5xl justify-between">
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
