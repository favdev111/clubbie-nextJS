import React from "react";
import Layout from "@layout";
import Seo from "@layout/seo";
import Wrap from "@layout/account-wrapper/";
import RecoverPass from "@page/auth/recover-pass/";

const RecoverPassPage = () => {
  return (
    <Layout hideHeader>
      <Seo title="Recover pass" desc="Lorem ipsum dolor sit amet" />
      <main className="main">
        <Wrap>
          <RecoverPass />
        </Wrap>
      </main>
    </Layout>
  );
};

export default RecoverPassPage;
