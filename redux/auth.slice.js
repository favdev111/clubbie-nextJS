import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  signup as makeSignUpReq,
  verifyAccount as makeVerifyAccountReq,
} from "../api/auth.api";

export const signup = createAsyncThunk(
  "auth/signup",
  async (credentials, store) => {
    return makeSignUpReq(credentials);
  }
);

export const verifyAccount = createAsyncThunk(
  "auth/verifyAccount",
  async (credentials, store) => {
    const token = store.getState().authReducer.tokens?.access?.token;
    return makeVerifyAccountReq(token, credentials);
  }
);

export const chatSlice = createSlice({
  name: "auth",
  initialState: {
    user: {},
    tokens: {},
    errors: {
      signupError: null,
      verifyAccError: null,
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
    [verifyAccount.pending]: (state) => {
      state.errors.verifyAccError = null;
    },
    [verifyAccount.fulfilled]: (state, { payload }) => {
      state.user = payload.user;
      state.errors.verifyAccError = null;
    },
    [verifyAccount.rejected]: (state, { error }) => {
      state.errors.verifyAccError = error.message;
    },
  },
});

export default chatSlice.reducer;
