import { configureStore } from "@reduxjs/toolkit";
import { folderApi } from "../service/folderService";
export const store = configureStore({
  reducer: {
    [folderApi.reducerPath]: folderApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(folderApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
