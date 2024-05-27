// icon:folder-add | Ant Design Icons https://ant.design/components/icon/ | Ant Design
import { forwardRef } from "react";

const IconChevronUp = forwardRef(function IconChevronUp(
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
        d="M7.646 4.646a.5.5 0 01.708 0l6 6a.5.5 0 01-.708.708L8 5.707l-5.646 5.647a.5.5 0 01-.708-.708l6-6z"
      />
    </svg>
  );
});

export { IconChevronUp };
