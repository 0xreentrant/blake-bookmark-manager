import { createMachine, assign } from "xstate";
import { useMachine } from "@xstate/react";

export const useTopUIState = () => {
  return useMachine(
    createMachine({
      initial: "init",
      context: {
        isExpanded: false,
      },
      states: {
        init: {
          on: {
            EXPAND_HEADER: { actions: assign({ isExpanded: true }) },
            SHRINK_HEADER: { actions: assign({ isExpanded: false }) },
          },
        },
      },
    }),
    { devTools: true }
  );
};
