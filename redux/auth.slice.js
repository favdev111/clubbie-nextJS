import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  signup as makeSignUpReq,
  login as makeLoginReq,
  googleLogin as makeGoogleLoginReq,
  verifyAccount as makeVerifyAccountReq,
} from "../api/auth.api";

export const signup = createAsyncThunk(
  "auth/signup",
  async (credentials, store) => {
    return makeSignUpReq(credentials);
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (credentials, store) => {
    return makeLoginReq(credentials);
  }
);

export const googleLogin = createAsyncThunk(
  "auth/googleLogin",
  async (credentials, store) => {
    return makeGoogleLoginReq(credentials);
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
      loginError: null,
      signupError: null,
      verifyAccError: null,
      googleLoginError: null,
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
    [login.pending]: (state) => {
      state.errors.loginError = null;
    },
    [login.fulfilled]: (state, { payload }) => {
      state.user = payload.user;
      state.tokens = payload.tokens;
      state.errors.loginError = null;
    },
    [login.rejected]: (state, { error }) => {
      state.errors.loginError = error.message;
    },
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
