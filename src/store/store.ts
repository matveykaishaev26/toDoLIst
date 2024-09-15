import { configureStore } from "@reduxjs/toolkit";
import { api } from "./api/api";
import { userReducer } from "./userSlice";
import { themeReducer } from "./themeSlice";
export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    user: userReducer,
    theme: themeReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
