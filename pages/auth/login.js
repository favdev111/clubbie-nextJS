import React from "react";
import router from "next/router";
import Layout from "@layout";
import Seo from "@layout/seo";
import Wrap from "@layout/account-wrapper/";
import Login from "@page/auth/login";
import auth from "@utils/helpers/auth";

const LoginPage = () => {
  const authUser = auth.getUser();
  if (authUser) {
    router.push("/");
  }

  return (
    <Layout hideHeader>
      <Seo
        title="Clubbie Login"
        desc="Clubbie Account Login - Raising The Bar For Amateur Sports"
      />
      <main className="main">
        <Wrap>
          <Login />
        </Wrap>
      </main>
    </Layout>
  );
};
export default LoginPage;
