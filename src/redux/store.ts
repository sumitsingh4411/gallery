import { configureStore } from "@reduxjs/toolkit";
import gallerySlice from "./slices/gallerySlice";

export const store = configureStore({
  reducer: {
    gallery: gallerySlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
