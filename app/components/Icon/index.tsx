import React, { forwardRef } from "react";
import dynamic from "next/dynamic";
const UKIcon = dynamic(() => import("./UKIcon"), { ssr: false });
const Icon = function (props) {
  return <UKIcon {...props} />;
};
export { Icon };
