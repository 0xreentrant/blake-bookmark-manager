import { forwardRef } from "react";

const BigSquare = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement>>(
  function BigSquare(props, ref) {
    return (
      <svg
        width="481"
        height="568"
        viewBox="0 0 481 568"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        ref={ref}
        {...props}
      >
        <rect
          x="1.34753"
          y="1"
          width="478"
          height="566"
          rx="47"
          stroke="#111111"
        fill="white"
          strokeWidth="2"
        />
      </svg>
    );
  }
);

export { BigSquare };
