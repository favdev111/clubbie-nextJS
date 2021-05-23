import Head from "next/head";
import React from "react";
import Wrap from "@layout/account-wrapper/";
import Logout from "@page/logout/";

const LogoutPage = () => {
  return (
    <div className="container">
      <Head>
        <title>Clubbie App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="main">
        <Wrap>
          <Logout />
        </Wrap>
      </main>
    </div>
  );
};

export default LogoutPage;
