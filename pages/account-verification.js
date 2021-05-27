import React from "react";
import Wrap from "@layout/account-wrapper/";
import AccountVerif from "@page/account-verification/";
import Layout from "@layout";
import Seo from "@layout/seo";

const AccountVerifPage = () => {
  return (
    <Layout hideHeader>
      <Seo
        title="Clubbie Account Verification"
        desc="Clubbie Account Verification - Raising The Bar For Amateur Sports"
      />
      <main className="main">
        <Wrap>
          <AccountVerif />
        </Wrap>
      </main>
    </Layout>
  );
};

export default AccountVerifPage;
