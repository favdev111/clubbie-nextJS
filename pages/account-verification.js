import React from "react";
import Wrap from "@layout/account-wrapper/";
import AccountVerif from "@page/account-verification/";

import Layout from "@layout";
import Seo from "@layout/seo";

const AccountVerifPage = () => {
  return (
    <Layout hideHeader>
      <Seo title="Account Verification" desc="Lorem ipsum dolor sit amet" />
      <main className="main">
        <Wrap>
          <AccountVerif />
        </Wrap>
      </main>
    </Layout>
  );
};

export default AccountVerifPage;
