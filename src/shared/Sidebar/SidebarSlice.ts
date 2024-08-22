import { createSlice } from "@reduxjs/toolkit";

export type typeSidebarContext = {
  isOpen: boolean;
};

const initialState: typeSidebarContext = {
  isOpen: true,
};

const sidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.isOpen = !state.isOpen;
    },
  },
});

export const { toggleSidebar } = sidebarSlice.actions;
export const sidebarSliceReducer = sidebarSlice.reducer;
