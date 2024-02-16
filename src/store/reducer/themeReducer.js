import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  theme: "light",
};

const themeReducer = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toogleTheme: (state) => {
      state.theme = state.theme === "light" ? "dark" : "light";
    },
  },
});

export const { toogleTheme } = themeReducer.actions;

export default themeReducer.reducer;
