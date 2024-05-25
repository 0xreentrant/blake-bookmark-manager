import { inspect } from "@xstate/inspect";
import "../styles/globals.css";

//import { Navigation } from "../features/Navigation";
//import { useTopUIState } from "../features/useTopUIState";

if (typeof window !== "undefined") {
  inspect({
    url: "https://statecharts.io/inspect",
    iframe: false,
  });
}

function MyApp({ Component, pageProps }) {
  //const [state, send] = useTopUIState();
  //const { isExpanded } = state.context;

  //const toggleExpanded = () => {
  //const res = isExpanded ? "SHRINK_HEADER" : "EXPAND_HEADER";
  //send(res);
  //};

  return (
    <div className="flex flex-1 h-screen w-full">
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
