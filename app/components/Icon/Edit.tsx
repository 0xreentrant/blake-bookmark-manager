// icon:folder-add | Ant Design Icons https://ant.design/components/icon/ | Ant Design
import { forwardRef } from "react";

const IconEdit = forwardRef(function IconEdit(
  props: React.SVGProps<SVGSVGElement>,
  ref
) {
  return (
    <svg
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      viewBox="0 0 24 24"
      height="1em"
      width="1em"
      {...props}
    >
      <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
      <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
  );
});

export { IconEdit };
