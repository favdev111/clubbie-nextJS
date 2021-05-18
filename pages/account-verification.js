import Head from "next/head";
import React from "react";
import Wrap from "@c/Wrap/";
import AccountVerif from "@c/AccountVerif/";

const AccountVerifPage = () => {
  return (
    <div className="container">
      <Head>
        <title>Clubbie App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="main">
        <Wrap>
          <AccountVerif />
        </Wrap>
      </main>
    </div>
  );
};

export default AccountVerifPage;
