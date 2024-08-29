import { forwardRef } from "react";

const BigSquare = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement>>(
  function BigSquare(props, ref) {
    return (
      <svg fill="none" xmlns="http://www.w3.org/2000/svg" ref={ref} {...props}>
        <rect
          x="1.34753"
          y="1"
          width="90%"
          height="100%"
          rx="47"
          stroke="#111111"
          strokeWidth="2"
        />
      </svg>
    );
  }
);

export { BigSquare };
