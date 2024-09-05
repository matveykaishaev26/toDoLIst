import { createSlice } from "@reduxjs/toolkit";

import { typeUser } from "../types/types";

const initialState: typeUser = {
  token: "",
  name: "",
  email: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: { payload: typeUser }) => {
      state.token = action.payload.token;
      state.name = action.payload.name;
      state.email = action.payload.email;
    },
  },
});

export const { setUser } = userSlice.actions;
export const userReducer = userSlice.reducer;
