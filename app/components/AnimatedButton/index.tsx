import Link from "next/link";
export function AnimatedButton({
  variant,
  href,
  className,
  children,
}: {
  variant?: string;
  className?: string;
  href?: string;
  children?;
}) {
  const classes =
    variant == "lg"
      ? `px-20 py-6 text-2xl [box-shadow:7px_7px_7px_#999999] hover:[box-shadow:6px_6px_8px_#aaaaaa] hover:active:[box-shadow:4px_4px_7px_#cccccc] rounded-2xl`
      : `px-8 py-2.5 [box-shadow:7px_7px_7px_#999999] hover:[box-shadow:6px_6px_8px_#aaaaaa] hover:active:[box-shadow:4px_4px_7px_#cccccc] rounded-xl`;

  return (
    <Link
      href={href}
      className={`w-max bg-burntsienna hover:bg-burntsienna-dark hover:active:bg-burntsienna hover:scale-[1.01] hover:active:scale-100 transition duration-290  font-medium text-white  tracking-[0] leading-[18px] ${classes} ${className}`}
    >
      {children}
    </Link>
  );
}
