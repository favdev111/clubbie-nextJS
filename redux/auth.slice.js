import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  signup as makeSignUpReq,
} from "../api/auth.api";

export const signup = createAsyncThunk(
  "auth/signup",
  async (credentials, store) => {
    return makeSignUpReq(credentials);
  }
);

export const chatSlice = createSlice({
  name: "auth",
  initialState: {
    user: {},
    tokens: {},
    errors: {
      signupError: null,
    },
  },
  reducers: {},
  extraReducers: {
    [signup.pending]: (state) => {
      state.errors.signupError = null;
    },
    [signup.fulfilled]: (state, { payload }) => {
      state.user = payload.user;
      state.tokens = payload.tokens;
      state.errors.signupError = null;
    },
    [signup.rejected]: (state, { error }) => {
      state.errors.signupError = error.message;
    },
  },
});

export default chatSlice.reducer;
