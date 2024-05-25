import dynamic from "next/dynamic";
const Icon = dynamic(() => import("./Icon"), { ssr: false });
export default Icon;
