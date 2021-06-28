import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { googleLogin as makeGoogleLoginReq } from "../api/auth.api";

export const googleLogin = createAsyncThunk(
  "auth/googleLogin",
  async (credentials, store) => {
    return makeGoogleLoginReq(credentials);
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: {},
    tokens: {},
    errors: {
      googleLoginError: null,
    },
  },
  reducers: {},
  extraReducers: {
    [googleLogin.pending]: (state) => {
      state.errors.googleLoginError = null;
    },
    [googleLogin.fulfilled]: (state, { payload }) => {
      state.user = payload.user;
      state.tokens = payload.tokens;
      state.errors.googleLoginError = null;
    },
    [googleLogin.rejected]: (state, { error }) => {
      state.errors.googleLoginError = error.message;
    },
  },
});

export default authSlice.reducer;
