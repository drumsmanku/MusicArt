import { createSlice } from "@reduxjs/toolkit";

export const buySlice = createSlice({
  name: "buy",
  initialState: [],
  reducers: {
    addToBuy: (state, action) => {
      state.push(action.payload);
    },
    removeFromBuy: (state, action) => {
      return state.filter((item) => item.id !== action.payload.id);
    },
  },
});

export const { addToBuy, removeFromBuy } = buySlice.actions;

export default buySlice.reducer;