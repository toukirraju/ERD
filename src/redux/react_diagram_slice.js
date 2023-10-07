import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  ERD: {},
};

const react_diagram_slice = createSlice({
  name: "ERD",
  initialState,
  reducers: {
    setErdData: (state, action) => {
      state.form = action.payload;
    },
  },
});

export const { setErdData } = react_diagram_slice.actions;
export default react_diagram_slice.reducer;
