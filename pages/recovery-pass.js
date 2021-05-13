import Head from "next/head";
import React from "react";

import Wrap from "@c/Wrap/index";
// import Wrap from "../components/Wrap/Wrap";

import RecoverPass from "@c/RecoverPass/index";
//import RecoverPass from "../components/RecoverPass/RecoverPass";

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
