import React from "react";
import Layout from "@layout";
import Seo from "@layout/seo";
import Wrap from "@layout/account-wrapper/";
import Logout from "@page/auth/logout/";

const LogoutPage = () => {
  return (
    <Layout hideHeader>
      <Seo title="Clubbie App" desc="Lorem ipsum dolor sit amet" />
      <main className="main">
        <Wrap>
          <Logout />
        </Wrap>
      </main>
    </Layout>
  );
};

export default LogoutPage;
