import { forwardRef } from "react";

const SmallSquare = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement>>(
  function SmallSquare(props, ref) {
    return (
      <svg
        width="311"
        height="477"
        viewBox="0 0 311 477"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        ref={ref}
        {...props}
      >
        <rect
          x="1.65283"
          y="1.1886"
          width="308"
          height="474"
          rx="39"
          stroke="#111111"
          strokeWidth="2"
        />
      </svg>
    );
  }
);

export { SmallSquare };
