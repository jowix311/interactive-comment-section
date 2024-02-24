import { configureStore } from "@reduxjs/toolkit";
import { commentSlice } from "../comment/comment.reducer";

export const store = configureStore({
  reducer: {
    comment: commentSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
