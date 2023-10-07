import { configureStore } from "@reduxjs/toolkit";
import react_diagram_slice from "./react_diagram_slice";
import react_flow_slice from "./react_flow_slice";

export const store = configureStore({
  reducer: {
    erdData: react_diagram_slice,
    flowData: react_flow_slice,
  },
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  // .concat(apiSlice.middleware),
});
