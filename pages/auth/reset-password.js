import React from "react";
import Layout from "@layout";
import Seo from "@layout/seo";
import Wrap from "@layout/account-wrapper/";
import ResetPassword from "@page/auth/reset-password/";

const ResetPasswordPage = () => {
  return (
    <Layout hideHeader>
      <Seo title="Reset Password" desc="Lorem ipsum dolor sit amet" />
      <main className="main">
        <Wrap>
          <ResetPassword />
        </Wrap>
      </main>
    </Layout>
  );
};

export default ResetPasswordPage;
