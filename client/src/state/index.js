import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "dark",
  bookId: "65cb54e74da03b4bd17fb104",
  userId: "65cbb36949212fac198f792c",
};

export const globalSlice = createSlice({
  name: "global",
  initialState: initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
  },
});

export const { setMode } = globalSlice.actions;

export default globalSlice.reducer;
