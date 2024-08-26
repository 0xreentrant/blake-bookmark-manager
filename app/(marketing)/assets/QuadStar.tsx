import { forwardRef } from "react";

const QuadStar = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement>>(
  function QuadStar(props, ref) {
    return (
      <svg
        width="76"
        height="95"
        viewBox="0 0 76 95"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        ref={ref}
        {...props}
      >
        <path
          d="M37.8352 86.2499C34.9965 66.3301 22.3818 50.5669 6.33698 47.3849C22.4286 44.1937 35.0701 28.3475 37.8596 8.34499C40.6982 28.2647 53.313 44.0277 69.3578 47.2096C53.2659 50.4009 40.6246 66.2472 37.8352 86.2499Z"
          stroke="white"
          strokeWidth="1.17509"
        />
      </svg>
    );
  }
);

export { QuadStar };
