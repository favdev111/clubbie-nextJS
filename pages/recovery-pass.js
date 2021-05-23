import Head from "next/head";
import React from "react";

import Wrap from "@layout/account-wrapper/";
import RecoverPass from "@page/recover-pass/";

const RecoverPassPage = () => {
  return (
    <div className="container">
      <Head>
        <title>Clubbie App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="main">
        <Wrap>
          <RecoverPass />
        </Wrap>
      </main>
    </div>
  );
};

export default RecoverPassPage;
