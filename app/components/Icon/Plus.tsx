// icon:folder-add | Ant Design Icons https://ant.design/components/icon/ | Ant Design
import { forwardRef } from "react";

const IconPlus = forwardRef(function IconPlus(
  props: React.SVGProps<SVGSVGElement>,
  ref
) {
  return (
    <svg
      viewBox="0 0 1024 1024"
      fill="currentColor"
      height="1em"
      width="1em"
      {...props}
    >
      <defs>
        <style />
      </defs>
      <path d="M482 152h60q8 0 8 8v704q0 8-8 8h-60q-8 0-8-8V160q0-8 8-8z" />
      <path d="M176 474h672q8 0 8 8v60q0 8-8 8H176q-8 0-8-8v-60q0-8 8-8z" />
    </svg>
  );
});

export { IconPlus };
