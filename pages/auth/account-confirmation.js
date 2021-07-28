import React from "react";
import router from "next/router";
import Layout from "@layout";
import Seo from "@layout/seo";
import Wrap from "@layout/account-wrapper/";
import AccountConfirm from "@page/auth/account-confirm/";
import { requiresPageAuth } from "@utils/middlewares/requiresPageAuth";

const AccountConfirmPage = ({ user }) => {
  if (user?.isActivated && process.browser) {
    router.push("/");
  }

  return (
    <Layout hideHeader>
      <Seo title="Account Confirmation" desc="Lorem ipsum dolor sit amet" />
      <main className="main">
        <Wrap>
          <AccountConfirm user={user} />
        </Wrap>
      </main>
    </Layout>
  );
};

export default AccountConfirmPage;

export const getServerSideProps = requiresPageAuth();
