import React from "react";
import { Provider } from "react-redux";
import { createWrapper } from "next-redux-wrapper";
import { store } from "@redux/store";
import auth from "@utils/helpers/auth";
import HTTPClient from "@api/HTTPClient";
import "../styles/app.css";

function ClubbieApp({ Component, pageProps }) {
  // client side
  if (process.browser) {
    // set axios access header
    HTTPClient.setHeader("Authorization", `Bearer ${auth.getAccessToken()}`);

    // update cookies
    if (pageProps?.setCookiesOnClient?.tokens) {
      const { tokens } = pageProps.setCookiesOnClient;
      auth.setAccessToken(tokens.access.token, {
        expires: new Date(tokens.access.expiry),
      });
      auth.setRefreshToken(tokens.refresh.token, {
        expires: new Date(tokens.refresh.expiry),
      });
      // update axios access header
      HTTPClient.setHeader("Authorization", `Bearer ${tokens.access.token}`);
    }
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
