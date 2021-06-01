import Layout from "@layout";
import Seo from "@layout/seo";
import React from "react";
import Wrap from "@layout/account-wrapper/";
import Login from "@page/login/";

const LoginPage = () => {
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
