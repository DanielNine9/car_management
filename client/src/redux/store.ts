import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
  },
});
export default store;

export type rootState = typeof store.getState;
export type appDispatch = typeof store.dispatch;
