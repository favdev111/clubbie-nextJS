import React from "react";
import "../public/styles/index.css";
import { Provider } from "react-redux";
import {createWrapper} from "next-redux-wrapper";
import store from '../redux/store'

function ClubbieApp({ Component, pageProps }) {
  return (
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
  )
}

const makeStore = () => store;
const wrapper = createWrapper(makeStore);

export default wrapper.withRedux(ClubbieApp);
