import { configureStore } from "@reduxjs/toolkit";
import pitchReducer from "./pitch.slice";
import authReducer from "./auth.slice";

export const store = configureStore({
  reducer: {
    pitch: pitchReducer,
    auth: authReducer,
  },
});
