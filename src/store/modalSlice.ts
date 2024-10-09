import { createSlice } from "@reduxjs/toolkit";

type typeModalState = {
  modals: Record<string, boolean>;
};
const initialState: typeModalState = {
  modals: {},
};
const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state, action) => {
      state.modals[action.payload] = true;
    },
    closeModal: (state, action) => {
      state.modals[action.payload] = false;
    },
    toggleModal: (state, action) => {
      state.modals[action.payload] = !state.modals[action.payload];
    },
    closeAllModals: (state) => {
      state.modals = {};
    },
  },
});

export const { toggleModal, closeModal, openModal, closeAllModals } =
  modalSlice.actions;
export const modalReducer = modalSlice.reducer;
