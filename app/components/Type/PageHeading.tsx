export function PageHeading({ children, className }: { children; className? }) {
  return (
    <div className="flex justify-center px-2">
      <div className="w-full max-w-5xl justify-start">
        <h1
          className={`text-3xl font-semibold py-2 lg:pt-3 lg:pb-4 ${className}`}
        >
          {children}
        </h1>
      </div>
    </div>
  );
}
