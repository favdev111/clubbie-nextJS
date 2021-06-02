import React from "react";
import Layout from "@layout";
import Seo from "@layout/seo";
import Wrap from "@layout/account-wrapper/";
import AccountVerif from "@page/auth/account-verification/";

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
