import Layout from "@layout";
import Seo from "@layout/seo";
import React from "react";
import Wrap from "@layout/account-wrapper/";
import Login from "@page/login/";

const LoginPage = () => {
  return (
    <Layout hideHeader>
      <Seo title="Clubbie App" desc="Lorem ipsum dolor sit amet" />
      <main className="main">
        <Wrap>
          <Login />
        </Wrap>
      </main>
    </Layout>
  );
};
export default LoginPage;
