import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
  name: "request",
  initialState: null,
  reducers: {
    addRequests: (state, action) => {
      return action.payload;
    },
    removeRequest: (state, action) => {
      const newState = state.filter((req) => req._id !== action.payload);
      return newState;
    },
    removeAllRequests: () => null,
  },
});

export const { addRequests, removeRequest, removeAllRequests } = requestSlice.actions;

export default requestSlice.reducer;
