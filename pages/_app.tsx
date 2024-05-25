import { inspect } from "@xstate/inspect";
import { Box, Link } from "@mui/material";
import "../styles/globals.css";

import { Navigation } from "../features/Navigation";
import { useTopUIState } from "../features/useTopUIState";

if (typeof window !== "undefined") {
  inspect({
  url: "https://statecharts.io/inspect",
  iframe: false
});
}

function MyApp({ Component, pageProps }) {
  const [state, send] = useTopUIState();
  const { isExpanded } = state.context;

  const toggleExpanded = () => {
    console.log("was", state.context.isExpanded);
    const res = isExpanded ? "SHRINK_HEADER" : "EXPAND_HEADER";
    send(res);
  };

  return (
    <Box display="flex" height="100vh">
      <Navigation isExpanded={isExpanded} handleExpand={toggleExpanded}>
        <Link href="/">All</Link>
        <Link href="/random">Random</Link>
      </Navigation>
      <Component {...pageProps} />
    </Box>
  );
}

export default MyApp;
