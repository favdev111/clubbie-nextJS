import React from "react";
import { Provider } from "react-redux";
import { createWrapper } from "next-redux-wrapper";
import { store } from "@redux/store";
import auth from "@utils/helpers/auth";
import "../styles/app.css";

function ClubbieApp({ Component, pageProps }) {
  // if user is on client set cookies there
  if (process.browser && pageProps?.setCookiesOnClient?.tokens) {
    const { tokens } = pageProps.setCookiesOnClient;
    auth.setAccessToken(tokens.access.token, {
      expires: new Date(tokens.access.expiry),
    });
    auth.setRefreshToken(tokens.refresh.token, {
      expires: new Date(tokens.refresh.expiry),
    });
  }

  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

const makeStore = () => store;
const wrapper = createWrapper(makeStore);

export default wrapper.withRedux(ClubbieApp);
