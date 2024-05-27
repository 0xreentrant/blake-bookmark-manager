// icon:folder-add | Ant Design Icons https://ant.design/components/icon/ | Ant Design
import { forwardRef } from "react";

const IconChevronDown = forwardRef(function IconChevronDown(
  props: React.SVGProps<SVGSVGElement>,
  ref
) {
  return (
   <svg
      fill="currentColor"
      viewBox="0 0 16 16"
      height="1em"
      width="1em"
      {...props}
   ref={ref}
    >
      <path
        fillRule="evenodd"
        d="M1.646 4.646a.5.5 0 01.708 0L8 10.293l5.646-5.647a.5.5 0 01.708.708l-6 6a.5.5 0 01-.708 0l-6-6a.5.5 0 010-.708z"
      />
    </svg>
  );
});

export { IconChevronDown };
