import React from "react";
import Layout from "@layout";
import Seo from "@layout/seo";
import Wrap from "@layout/account-wrapper/";
import AccountConfirm from "@page/auth/account-confirm/";

const AccountConfirmPage = () => {
  return (
    <Layout hideHeader>
      <Seo title="Account Confirmation" desc="Lorem ipsum dolor sit amet" />
      <main className="main">
        <Wrap>
          <AccountConfirm />
        </Wrap>
      </main>
    </Layout>
  );
};

export default AccountConfirmPage;
