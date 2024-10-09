import { createSlice } from "@reduxjs/toolkit";
import { typeTheme } from "../types/typeTheme";

const initialState: typeTheme = {
  isDarkMode: false,
};
const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
      toggleTheme(state) {
        state.isDarkMode = !state.isDarkMode;
      }
    }
  });


export const { toggleTheme} = themeSlice.actions;
export const themeReducer = themeSlice.reducer;