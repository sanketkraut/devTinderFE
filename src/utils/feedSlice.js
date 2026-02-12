import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
  name: "feed",
  initialState: null,
  reducers: {
    addFeed: (state, action) => {
      return action.payload;
    },
    removeFeed: (state, action) => {
      const newState = state.filter((feed) => feed._id !== action.payload);
      return newState;
    },
    removeAllFeed: () => null,
  },
});

export const { addFeed, removeFeed, removeAllFeed } = feedSlice.actions;

export default feedSlice.reducer;
