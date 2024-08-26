import { forwardRef } from "react";

const OctoStar = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement>>(
  function OctoStar(props, ref) {
    return (
      <svg
        width="137"
        height="136"
        viewBox="0 0 137 136"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        ref={ref}
        {...props}
      >
        <path
          d="M81.9495 36.8291L114.263 21.9375L99.3711 54.2508L98.9184 55.233L99.933 55.6075L133.312 67.9264L99.933 80.2454L98.9184 80.6198L99.3711 81.6021L114.263 113.915L81.9495 99.0237L80.9672 98.571L80.5928 99.5856L68.2738 132.965L55.9549 99.5856L55.5804 98.571L54.5982 99.0237L22.2849 113.915L37.1765 81.6021L37.6292 80.6198L36.6146 80.2454L3.23562 67.9264L36.6146 55.6075L37.6292 55.233L37.1765 54.2508L22.2849 21.9375L54.5982 36.8291L55.5804 37.2818L55.9549 36.2672L68.2738 2.88821L80.5928 36.2672L80.9672 37.2818L81.9495 36.8291Z"
          fill="white"
          stroke="#020202"
          strokeWidth="2"
        />
      </svg>
    );
  }
);

export { OctoStar };
