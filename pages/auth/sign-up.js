import React from "react";
import router from "next/router";
import Layout from "@layout";
import Seo from "@layout/seo";
import Wrap from "@layout/account-wrapper/";
import SignUp from "@page/auth/sign-up";
import auth from "@utils/helpers/auth";

const SignUpPage = () => {
  const authAccessToken = auth.getAccessToken();
  if (authAccessToken) {
    router.push("/");
  }

  return (
    <Layout hideHeader>
      <Seo
        title="Clubbie Signup"
        desc="Clubbie Account Signup - Raising The Bar For Amateur Sports"
      />
      <main className="main">
        <Wrap>
          <SignUp />
        </Wrap>
      </main>
    </Layout>
  );
};
export default SignUpPage;
