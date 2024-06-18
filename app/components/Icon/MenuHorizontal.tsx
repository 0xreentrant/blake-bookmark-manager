// icon:folder-add | Ant Design Icons https://ant.design/components/icon/ | Ant Design
import { forwardRef } from "react";

const IconMenuHorizontal = forwardRef(function IconMenuHorizontal(
  props: React.SVGProps<SVGSVGElement>,
  ref
) {
  return (
    <svg
      viewBox="0 0 21 21"
      fill="currentColor"
      height="1em"
      width="1em"
      {...props}
    >
      <g fill="currentColor" fillRule="evenodd">
        <path d="M11.5 10.5 A1 1 0 0 1 10.5 11.5 A1 1 0 0 1 9.5 10.5 A1 1 0 0 1 11.5 10.5 z" />
        <path d="M6.5 10.5 A1 1 0 0 1 5.5 11.5 A1 1 0 0 1 4.5 10.5 A1 1 0 0 1 6.5 10.5 z" />
        <path d="M16.5 10.5 A1 1 0 0 1 15.5 11.5 A1 1 0 0 1 14.5 10.5 A1 1 0 0 1 16.5 10.5 z" />
      </g>
    </svg>
  );
});

export { IconMenuHorizontal };
