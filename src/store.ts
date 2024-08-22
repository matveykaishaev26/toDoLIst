import { configureStore } from "@reduxjs/toolkit";
import { sidebarSliceReducer } from "./shared/Sidebar/SidebarSlice";
export const store = configureStore({
  reducer: {
    sidebar: sidebarSliceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
