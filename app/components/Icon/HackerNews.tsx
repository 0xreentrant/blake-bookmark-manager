// icon:folder-add | Ant Design Icons https://ant.design/components/icon/ | Ant Design
import { forwardRef } from "react";

const IconHackerNews = forwardRef(function IconHackerNews(
  props: React.SVGProps<SVGSVGElement>,
  ref
) {
  return (
    <svg
      viewBox="0 0 28 28"
      fill="currentColor"
      height="1.25em"
      width="1.25em"
      {...props}>
      <path
        fill="currentColor"
        d="M25.339 6.166v18.802H6.537V6.166h18.802zm1.88-1.88H4.656v22.563h22.563V4.286zm-8.89 5.582h2.662l-3.755 7.051v4.23h-2.344v-4.23l-3.89-7.051h2.767l2.333 4.912 2.227-4.912z"
      />
    </svg>
  );
});

export { IconHackerNews };
