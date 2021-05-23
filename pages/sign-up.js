import Head from "next/head";
import React from "react";
import Wrap from "@layout/account-wrapper/";
import SignUp from "@page/sign-up";

const SignUpPage = () => {
  return (
    <div className="container">
      <Head>
        <title>Clubbie App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="main">
        <Wrap>
          <SignUp />
        </Wrap>
      </main>
    </div>
  );
};
export default SignUpPage;
