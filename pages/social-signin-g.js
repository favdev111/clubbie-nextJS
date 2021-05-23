import Head from "next/head";
import React from "react";
import Wrap from "@layout/account-wrapper/";
import SocialSigninG from "@page/social-signing-google/";

const SocialSigninGpage = () => {
  return (
    <div className="container">
      <Head>
        <title>Clubbie App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="main">
        <Wrap>
          <SocialSigninG />
        </Wrap>
      </main>
    </div>
  );
};

export default SocialSigninGpage;
