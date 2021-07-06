import React from "react";
import router from "next/router";
import Layout from "@layout";
import Seo from "@layout/seo";
import Wrap from "@layout/account-wrapper/";
import AccountVerif from "@page/auth/account-verification/";
import { requiresPageAuth } from "@utils/middlewares/requiresPageAuth";

const AccountVerifPage = ({ user }) => {
  if (user.isActivated && process.browser) {
    router.push("/");
  }

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

export const getServerSideProps = requiresPageAuth();
